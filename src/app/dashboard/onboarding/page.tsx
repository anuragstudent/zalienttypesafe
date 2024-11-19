// pages/onboarding.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ImageUpload from "@/components/image-upload";
import { OnboardingData } from "@/shared/validation/auth";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { requestHandler } from "@/utils/client/requestHandler";

// Import the Nepal location data
import nepalLocations from "@/utils/nepal_location.json";

interface User {
  name: string;
  email: string;
  photoUrl?: string;
}

interface Province {
  id: number;
  name: string;
  districtList: District[];
}

interface District {
  id: number;
  name: string;
  municipalityList: Municipality[];
}

interface Municipality {
  id: number;
  name: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form methods for both steps
  const methods = useForm<OnboardingData>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      photo: null,
      country: "Nepal",
      province: "",
      district: "",
      municipality: "",
      tole: "",
    },
  });

  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
    trigger,
  } = methods;

  // Fetch user data on mount
  useEffect(() => {
    async function fetchUserData() {
      try {
        const data = await requestHandler<{ user: User }>({
          method: "GET",
          url: "/api/getUserData",
          protected: true,
        });

        // Set default name if not already filled
        if (!watch("name") && data.user.name) {
          setValue("name", data.user.name);
        }

        // Set default photo if not already filled
        if (!watch("photo") && data.user.photoUrl) {
          setValue("photo", data.user.photoUrl);
        }
      } catch (error) {
        toast.error((error as Error).message || "Failed to fetch user data");
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [router, setValue, watch]);

  const onSubmit = async () => {
    setIsSubmitting(true);

    try {
      const data = getValues();

      // Prepare the payload
      const payload = { ...data };

      // Send data to the server
      await requestHandler({
        method: "POST",
        url: "/api/completeOnboarding",
        body: payload,
        protected: true,
      });

      toast.success("Onboarding completed successfully!");

      setStep(3); // Move to success step
    } catch (error) {
      const errorMessage =
        (error as Error)?.message || "Failed to complete onboarding";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await trigger(["name", "phoneNumber", "photo"]);
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = await trigger([
        "country",
        "province",
        "district",
        "municipality",
        "tole",
      ]);
      if (isValid) {
        onSubmit();
      }
    }
  };

  // Get provinces from the Nepal location data
  const provinces: Province[] = nepalLocations.provinceList;

  // Watch for selected province and district
  const selectedProvinceName = watch("province");
  const selectedDistrictName = watch("district");

  // Get the selected province object
  const selectedProvince = provinces.find(
    (province) => province.name === selectedProvinceName
  );

  // Get the districts of the selected province
  const districts = selectedProvince ? selectedProvince.districtList : [];

  // Get the selected district object
  const selectedDistrict = districts.find(
    (district) => district.name === selectedDistrictName
  );

  // Get the municipalities of the selected district
  const municipalities = selectedDistrict
    ? selectedDistrict.municipalityList
    : [];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Step 1: Basic Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  {watch("photo") ? (
                    <AvatarImage src={watch("photo")!} alt="User Avatar" />
                  ) : (
                    <AvatarFallback>
                      {watch("name") ? watch("name").charAt(0) : "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">
                    {watch("name") || "Your Name"}
                  </h3>
                </div>
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-muted border border-border rounded-l text-sm text-muted-foreground">
                    +977
                  </span>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be exactly 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number must be exactly 10 digits",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "Phone number must contain only digits",
                      },
                    })}
                    className="rounded-l-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Upload Photo</Label>
                <Controller
                  name="photo"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      onUploadComplete={(url: string | null) =>
                        field.onChange(url)
                      }
                      initialImage={field.value}
                    />
                  )}
                />
                {errors.photo && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.photo.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <div />
                <Button onClick={handleNextStep}>Next</Button>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Step 2: Address</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your NFC Integrated card will be sent to this location.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary" size={20} />
                  <Input
                    id="country"
                    {...register("country")}
                    value="Nepal"
                    disabled
                  />
                </div>
                {errors.country && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="province">Province</Label>
                <select
                  id="province"
                  {...register("province", {
                    required: "Province is required",
                    onChange: () => {
                      setValue("district", "");
                      setValue("municipality", "");
                    },
                  })}
                  className="w-full border rounded px-3 py-2 text-sm bg-background text-foreground"
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.province.message}
                  </p>
                )}
              </div>
              {selectedProvince && (
                <div>
                  <Label htmlFor="district">District</Label>
                  <select
                    id="district"
                    {...register("district", {
                      required: "District is required",
                      onChange: () => setValue("municipality", ""),
                    })}
                    className="w-full border rounded px-3 py-2 text-sm bg-background text-foreground"
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              )}
              {selectedDistrict && (
                <div>
                  <Label htmlFor="municipality">Municipality</Label>
                  <select
                    id="municipality"
                    {...register("municipality", {
                      required: "Municipality is required",
                    })}
                    className="w-full border rounded px-3 py-2 text-sm bg-background text-foreground"
                  >
                    <option value="">Select Municipality</option>
                    {municipalities.map((municipality) => (
                      <option key={municipality.id} value={municipality.name}>
                        {municipality.name}
                      </option>
                    ))}
                  </select>
                  {errors.municipality && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.municipality.message}
                    </p>
                  )}
                </div>
              )}
              {watch("municipality") && (
                <div>
                  <Label htmlFor="tole">Tole</Label>
                  <Input
                    type="text"
                    id="tole"
                    placeholder="Enter your tole"
                    {...register("tole", { required: "Tole is required" })}
                  />
                  {errors.tole && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.tole.message}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button onClick={handleNextStep} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Finish"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <CheckCircle className="mx-auto mb-4 text-success" size={64} />
            <h2 className="text-2xl font-semibold mb-2">
              Onboarding Complete!
            </h2>
            <p>
              You have successfully completed onboarding and are now verified!
            </p>
            <Button className="mt-6" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const renderStepsIndicator = () => {
    return (
      <div className="flex justify-center gap-4 my-6">
        {[1, 2, 3].map((stepNum) => (
          <div
            key={stepNum}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold ${
              step >= stepNum
                ? "bg-primary text-primary-foreground"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {stepNum}
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-lg p-8 bg-card shadow-md rounded">
          <div className="w-full text-center mb-6">
            <h1 className="text-3xl font-semibold">Welcome To Zalient 😎</h1>
            <p className="text-muted-foreground text-sm">
              You are one step away from getting your customized NFC card at
              your home 💸
            </p>
          </div>
          {renderStepsIndicator()}
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
}
