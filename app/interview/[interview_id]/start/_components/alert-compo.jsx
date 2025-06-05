"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AlertCompo = ({ children, stopInterview }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

            <AlertDialogContent className="bg-[#0D1117] border border-green-600 rounded-xl shadow-2xl text-white max-w-md w-full">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-green-400 text-2xl font-bold">
                        End Interview?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 mt-2 text-md leading-relaxed">
                        This action <span className="text-red-500 font-medium">cannot be undone</span>.
                        Once you end the interview, you will not be able to return to this session.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 flex gap-4 justify-end">
                    <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-md transition-all duration-200">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => stopInterview()}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-all duration-200"
                    >
                        End Interview
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertCompo;
