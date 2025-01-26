import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState({ name: "", about: "", style: "" });
  console.log("value", value);
  return (
    <div>
      Hello "/about"!
      <div>
        <input
          type="text"
          onChange={(e) =>
            setValue((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="text"
          onChange={(e) =>
            setValue((prev) => ({ ...prev, about: e.target.value }))
          }
        />

        <input
          type="text"
          onChange={(e) =>
            setValue((prev) => ({ ...prev, style: e.target.value }))
          }
        />
      </div>
    </div>
  );
}
