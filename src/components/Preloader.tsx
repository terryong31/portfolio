import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"

const Preloader = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = React.useState(13)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const timer1 = setTimeout(() => setProgress(66), 500)
        const timer2 = setTimeout(() => {
            setProgress(100)
            setTimeout(() => setIsLoading(false), 200) // Short delay at 100%
        }, 1000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white font-serif">
                <Field className="w-full max-w-sm">
                    <FieldLabel htmlFor="progress-upload">
                        <span>Loading</span>
                        <span className="ml-auto">{progress}%</span>
                    </FieldLabel>
                    <Progress value={progress} />
                </Field>
            </div>
        )
    }

    return <>{children}</>
}

export default Preloader;
