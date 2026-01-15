"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Baby {
  id: string;
  name: string;
  birth_date: string;
  gender: string | null;
  weight_at_birth: number | null;
  height_at_birth: number | null;
  photo_url: string | null;
}

interface EditBabyContentProps {
  baby: Baby;
}

export default function EditBabyContent({ baby }: EditBabyContentProps) {
  const [name, setName] = useState(baby.name);
  const [birthDate, setBirthDate] = useState(baby.birth_date);
  const [gender, setGender] = useState(baby.gender || "");
  const [weightAtBirth, setWeightAtBirth] = useState(baby.weight_at_birth?.toString() || "");
  const [heightAtBirth, setHeightAtBirth] = useState(baby.height_at_birth?.toString() || "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(baby.photo_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Photo must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    let photoUrl = baby.photo_url;

    // Upload new photo if selected
    if (photoFile) {
      const fileExt = photoFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("baby-photos")
        .upload(fileName, photoFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (!uploadError && uploadData) {
        const { data: { publicUrl } } = supabase.storage
          .from("baby-photos")
          .getPublicUrl(uploadData.path);
        photoUrl = publicUrl;
      }
    } else if (photoPreview === null) {
      // Photo was removed
      photoUrl = null;
    }

    const { error } = await supabase
      .from("babies")
      .update({
        name,
        birth_date: birthDate,
        gender: gender || null,
        weight_at_birth: weightAtBirth ? parseFloat(weightAtBirth) : null,
        height_at_birth: heightAtBirth ? parseFloat(heightAtBirth) : null,
        photo_url: photoUrl,
      })
      .eq("id", baby.id);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/babies/${baby.id}`);
        router.refresh();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/dashboard/babies/${baby.id}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900">
            <span>←</span>
            <span>Back to Profile</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✏️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit {baby.name}'s Profile</h1>
          <p className="text-gray-500">Update your baby's information</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
              ✅ Profile updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Baby's Photo
              </label>
              <div className="flex items-center gap-6">
                <div 
                  className="w-24 h-24 rounded-full bg-[#f4f6f5] flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#425a51] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl text-gray-400">📷</span>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-[#f4f6f5] text-gray-700 text-sm font-medium hover:bg-[#e8edea] transition-colors"
                    >
                      {photoPreview ? "Change Photo" : "Upload Photo"}
                    </button>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP. Max 5MB.</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Baby's Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 focus:border-[#425a51] transition-all"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 focus:border-[#425a51] transition-all"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                {[
                  { value: "male", label: "Boy 👦", color: "bg-blue-50 border-blue-200" },
                  { value: "female", label: "Girl 👧", color: "bg-pink-50 border-pink-200" },
                  { value: "other", label: "Other 🌈", color: "bg-purple-50 border-purple-200" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setGender(option.value === gender ? "" : option.value)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                      gender === option.value
                        ? `${option.color} border-current`
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Birth Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                  Weight at Birth (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={weightAtBirth}
                  onChange={(e) => setWeightAtBirth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 focus:border-[#425a51] transition-all"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                  Height at Birth (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  step="0.1"
                  min="0"
                  max="70"
                  value={heightAtBirth}
                  onChange={(e) => setHeightAtBirth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#425a51]/20 focus:border-[#425a51] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Link
                href={`/dashboard/babies/${baby.id}`}
                className="flex-1 py-4 rounded-xl border border-gray-200 text-center font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 py-4 rounded-xl bg-[#425a51] text-white font-semibold text-lg hover:bg-[#364842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : success ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
