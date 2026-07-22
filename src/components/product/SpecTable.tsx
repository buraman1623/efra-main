import { ProductSpecs } from "@/types";

interface SpecTableProps {
  specs: ProductSpecs;
}

export function SpecTable({ specs }: SpecTableProps) {
  const specEntries = Object.entries(specs).filter(
    ([, value]) => value !== null && value !== "" && value !== undefined
  );

  if (specEntries.length === 0) {
    return (
      <div className="p-6 glass-panel border border-glass-border rounded-brand-md text-brand-muted text-center text-body-sm">
        Specifications not available for this model.
      </div>
    );
  }

  // Format key from camelCase or snake_case to Title Case
  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div className="overflow-hidden rounded-brand-md border border-glass-border bg-black/40 backdrop-blur-md">
      <table className="w-full text-left border-collapse">
        <tbody>
          {specEntries.map(([key, value], index) => (
            <tr
              key={key}
              className={`transition-colors hover:bg-white/[0.04] ${
                index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
              }`}
            >
              <th className="py-3.5 px-5 text-body-sm font-medium text-brand-light/70 border-b border-glass-border last:border-0 w-1/3">
                {formatKey(key)}
              </th>
              <td className="py-3.5 px-5 text-body-sm font-semibold text-brand-light border-b border-glass-border last:border-0">
                {typeof value === "boolean"
                  ? value
                    ? "Yes"
                    : "No"
                  : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}