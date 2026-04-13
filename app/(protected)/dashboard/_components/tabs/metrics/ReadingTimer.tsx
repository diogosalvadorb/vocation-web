import { saveStudySession } from "@/actions/create-study";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Pause, Play, Square } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ReadingTimerProps {
  todayMinutes: number;
  totalMinutes: number;
  onSave: (minutes: number) => void;
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}min`;
  return `${mins}min`;
}

function formatTimerDisplay(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function ReadingTimer({
  todayMinutes,
  totalMinutes,
  onSave,
}: ReadingTimerProps) {
  const [timer, setTimer] = useState({ isRunning: false, seconds: 0 });
  const { executeAsync: executeSave, isPending } = useAction(saveStudySession);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => ({ ...prev, seconds: prev.seconds + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning]);

  const handleFinish = async () => {
    if (timer.seconds < 60) {
      setTimer({ isRunning: false, seconds: 0 });
      return;
    }

    const minutes = Math.floor(timer.seconds / 60);

    const result = await executeSave({ type: "reading", minutes });

    if (result?.serverError) {
      console.log(result.serverError);
      toast.error("Erro ao salvar sessão de leitura.");
      return;
    }

    onSave(minutes);
    setTimer({ isRunning: false, seconds: 0 });
    toast.success(`${minutes} min de leitura salvos!`);
  };

  return (
    <div>
      <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
        <BookOpen className="text-primary h-5 w-5" />
        Reading Timer
      </h3>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Today Reading
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">
            {formatTime(todayMinutes)}
          </p>
        </Card>

        <Card className="bg-card/80 border-border/50 rounded-xl p-5">
          <span className="text-muted-foreground text-sm font-semibold">
            Total Reading
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">
            {formatTime(totalMinutes)}
          </p>
        </Card>

        <Card className="border-border/50 rounded-xl p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-semibold">
              Counter
            </span>
          </div>

          <p className="text-foreground mb-3 font-mono text-2xl font-bold">
            {formatTimerDisplay(timer.seconds)}
          </p>

          <div className="flex items-center gap-2">
            {!timer.isRunning && timer.seconds === 0 && (
              <Button
                onClick={() =>
                  setTimer((prev) => ({ ...prev, isRunning: true }))
                }
                size="sm"
                className="bg-primary hover:bg-primary/90 h-9 flex-1 rounded-lg transition-all"
              >
                <Play className="mr-1 h-3 w-3" /> Start
              </Button>
            )}

            {timer.isRunning && (
              <Button
                onClick={() =>
                  setTimer((prev) => ({ ...prev, isRunning: false }))
                }
                size="sm"
                className="h-9 flex-1 rounded-lg bg-amber-500 transition-all hover:bg-amber-500/90"
              >
                <Pause className="mr-1 h-3 w-3" /> Pause
              </Button>
            )}

            {!timer.isRunning && timer.seconds > 0 && (
              <Button
                onClick={() =>
                  setTimer((prev) => ({ ...prev, isRunning: true }))
                }
                size="sm"
                className="bg-primary hover:bg-primary/90 h-9 flex-1 rounded-lg transition-all"
              >
                <Play className="mr-1 h-3 w-3" /> Continue
              </Button>
            )}

            {timer.seconds > 0 && (
              <Button
                onClick={handleFinish}
                disabled={isPending}
                size="sm"
                className="bg-destructive hover:bg-destructive/90 h-9 rounded-lg transition-all"
              >
                <Square className="mr-1 h-3 w-3" />
                {isPending ? "Saving..." : "Finish"}
              </Button>
            )}
          </div>

          {timer.seconds > 0 && timer.seconds < 60 && (
            <p className="text-muted-foreground mt-2 text-center text-xs">
              Min 60 segonds to save session
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
