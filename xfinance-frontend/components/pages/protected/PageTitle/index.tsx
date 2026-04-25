import React from "react";

export const PageTitle: React.FC<{
  title: string;
  description: string;
}> = (props) => {
  return (
    <div className="space-y-2">
      <h2 className="uppercase tracking-[0.2em] font-bold text-xl">
        {props.title}
      </h2>
      <p>{props.description}</p>
    </div>
  );
};
