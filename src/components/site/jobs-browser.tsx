"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard } from "@/components/site/job-card";
import { JOB_FIELDS, JOB_LOCATIONS, JOB_TYPES, locationBucket } from "@/data/jobs";
import { useAllJobs } from "@/lib/demo-store";

const ALL = "all";

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger aria-label={label} className="w-full sm:w-44">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All {label.toLowerCase()}s</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function JobsBrowser() {
  const all = useAllJobs();
  const [q, setQ] = useState("");
  const [type, setType] = useState(ALL);
  const [field, setField] = useState(ALL);
  const [location, setLocation] = useState(ALL);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return all.filter(
      (j) =>
        (type === ALL || j.type === type) &&
        (field === ALL || j.field === field) &&
        (location === ALL || locationBucket(j.location) === location) &&
        (!needle || `${j.title} ${j.company} ${j.description}`.toLowerCase().includes(needle)),
    );
  }, [all, q, type, field, location]);

  const filtered = q || type !== ALL || field !== ALL || location !== ALL;

  function reset() {
    setQ("");
    setType(ALL);
    setField(ALL);
    setLocation(ALL);
  }

  return (
    <div>
      <div className="surface flex flex-col gap-3 rounded-2xl border border-line bg-card p-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search aria-hidden strokeWidth={1.5} className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-ink" />
          <Input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, company or keyword"
            aria-label="Search jobs"
            className="pl-10"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:flex">
          <FilterSelect label="Type" value={type} onChange={setType} options={JOB_TYPES} />
          <FilterSelect label="Field" value={field} onChange={setField} options={JOB_FIELDS} />
          <FilterSelect label="Location" value={location} onChange={setLocation} options={JOB_LOCATIONS} />
        </div>
      </div>

      <div className="mt-6 mb-4 flex items-center justify-between text-sm text-muted-ink" aria-live="polite">
        <p>
          {results.length} {results.length === 1 ? "job" : "jobs"}
        </p>
        {filtered && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <X strokeWidth={2} /> Clear filters
          </Button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-4 lg:grid-cols-2">
          {results.map((j) => (
            <li key={j.id}>
              <JobCard job={j} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-xl font-bold">No jobs match your filters.</p>
          <p className="mt-1 text-muted-ink">Try a different keyword or clear the filters.</p>
          <Button className="mt-5" variant="outline" onClick={reset}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
