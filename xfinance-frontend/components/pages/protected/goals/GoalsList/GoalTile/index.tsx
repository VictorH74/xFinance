import { ListableGoal } from "@/modules/goals/domain/goal.types";
import {
  formatCurrency,
  getCategoryName,
  getColorBackground,
} from "@/util/functions";
import { twMerge } from "tailwind-merge";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export const GoalTile: React.FC<{
  goal: ListableGoal;
}> = ({ goal }) => {
  const progress = Math.round((goal.currentValue / goal.amountLimit) * 100);

  const remainingValue = goal.amountLimit - goal.currentValue;
  const cat = goal.category.name !== "" ? goal.category : null;

  return (
    <article
      key={goal.id}
      className="grid gap-2 px-6 py-5"
      // data-aos-delay={500}
      // data-aos="flip-up"
    >
      <div className="flex flex-row justify-between">
        <div>
          {/* CAT DATA */}
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <div
              className="py-1 px-4 rounded-full flex gap-2 items-center"
              style={{
                backgroundColor: getColorBackground(
                  cat?.color ?? "#5d5d5d",
                  20,
                ),
              }}
            >
              {cat && <p className="text-lg -mt-1">{cat.emoji}</p>}

              <p className="text-[0.875rem] font-semibold text-zinc-600">
                {!!cat ? getCategoryName(cat) : "Sem categoria"}
              </p>
            </div>
          </div>
          <div className="text-zinc-500 font-medium text-sm">
            {formatCurrency(goal.currentValue, "BRL")} de {formatCurrency(goal.amountLimit, "BRL")}
          </div>
        </div>

        <div className="text-right">
          <div>{Math.round((goal.currentValue / goal.amountLimit) * 100)}%</div>
          <div
            className={twMerge(
              "font-semibold text-sm px-4 py-1 rounded-full",
              progress > 100
                ? "text-red-600 bg-red-600/10"
                : progress > goal.notificationAt
                  ? "text-amber-600 bg-amber-600/10"
                  : "text-green-600 bg-green-600/10",
            )}
          >
            {progress > 100
              ? "excedida"
              : progress > goal.notificationAt
                ? "quase no limite"
                : "dentro do limite"}
          </div>
        </div>
      </div>
      <div>
        {/* PROGRESS BAR */}
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            className={twMerge(
              "h-full rounded-full",
              progress > 100
                ? "bg-red-600"
                : progress > goal.notificationAt
                  ? "bg-amber-600"
                  : "bg-green-600",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={twMerge(
            "font-medium text-sm",
            remainingValue < 0 ? "text-red-700" : "text-zinc-500",
          )}
        >
          {formatCurrency(Math.abs(remainingValue), "BRL")}{" "}
          {remainingValue < 0 ? "ultrapassado" : "restante"}
        </div>
        <div className="flex">
          <button className=" border-red-500 px-6 py-1 rounded-md text-zinc-500 font-semibold hover:bg-red-700 hover:text-white duration-200">
            <DeleteIcon sx={{ fontSize: 20 }} />
          </button>
          <button className=" border-zinc-300 px-6 py-1 rounded-md text-zinc-500 font-semibold hover:bg-blue-400 hover:text-white duration-200">
            <EditSquareIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    </article>
  );
};
