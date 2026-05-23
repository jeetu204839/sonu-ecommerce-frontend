import Link from "next/link";
import type { Metadata } from "next";

import ProfileForm from "./ProfileForm";
import { getShopProfileForPage } from "./actions";

export const metadata: Metadata = {
  title: "My Profile | Ray Enterprises",
  description: "View and update your account name, email, and phone number.",
};

export default async function UserProfilePage() {
  const profile = await getShopProfileForPage();

  const cardInner = profile.loggedIn ? (
    <div>
      <h2 className="h3 text-primary mb-4">Account details</h2>
      <p className="text-muted mb-4">
        All fields are optional. Your verified mobile number and any details
        from login are filled in automatically—you can update them anytime.
      </p>
      <ProfileForm
        initialName={profile.name}
        initialEmail={profile.email}
        initialPhoneNumber={profile.phoneNumber}
      />
    </div>
  ) : (
    <div className="text-center py-3">
      <p className="text-secondary mb-4">
        Sign in with your phone number to view and edit your profile.
      </p>
      <Link href="/" className="btn btn-primary rounded-pill px-4">
        Go to home &amp; sign in
      </Link>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="p-4 p-lg-5 bg-white border border-secondary rounded shadow-sm">
            {cardInner}
          </div>
        </div>
      </div>
    </div>
  );
}
