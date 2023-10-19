import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

// export const runtime = "edge";

export const metadata: Metadata = {
    title: "Sign in",
};
export default function({
    searchParams,
}: {
    searchParams: {
        redirectUrl?: string;
    };
}) {
    const { redirectUrl } = searchParams || {};
    return (
        <section className="py-24">
            <div className="container">
                <div className="flex justify-center">
                    <SignIn redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    );
}
