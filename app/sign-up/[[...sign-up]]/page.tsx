import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

// export const runtime = "edge";

export const metadata: Metadata = {
    title: "Sign up",
};

export default function Page({
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
                    <SignUp redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    );
}
