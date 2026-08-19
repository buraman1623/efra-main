-- ============================================================
-- Efra Business Group — Admin User Management
-- Allows admins to view & update any profile (to change roles),
-- while guarding against privilege escalation.
-- ============================================================

-- Admins can update any profile (needed for the /admin/users role
-- management screen). Combined with the existing "Users can update own
-- profile" policy, every profile is now updatable by either its owner or
-- an admin.
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Guard: only an admin may change a `role` value, whether they're editing
-- their own row or someone else's. This closes a gap in the original
-- "Users can update own profile" policy, which had no column-level
-- restriction and would otherwise let any signed-in user promote
-- themselves to admin via a direct table update.
CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Only admins can change user roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS profiles_role_change_guard ON public.profiles;
CREATE TRIGGER profiles_role_change_guard
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_escalation();
