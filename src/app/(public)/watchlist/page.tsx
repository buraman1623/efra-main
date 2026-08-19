import { redirect } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserWatchlist } from "@/lib/data/watchlist";
import WatchlistPageClient from "./WatchlistPageClient";

export const metadata: Metadata = {
  title: "My Watchlist | Efra Business Group",
  description: "View your saved machinery and equipment",
};

export default async function WatchlistPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/watchlist");
  }

  const watchlist = await getUserWatchlist(user.id);

  return <WatchlistPageClient watchlist={watchlist} />;
}
