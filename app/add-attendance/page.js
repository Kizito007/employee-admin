"use client";
import axios from "axios";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import FlashBanner from "@/app/components/common/FlashBanner";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { convertBase64ImageToJpg } from "./convertBase64ToJpg";

function CaptureUpload() {
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [employeeId, setEmployeeId] = useState("");
    const [employee, setEmployee] = useState({});
    const webcamRef = useRef(null);
    const router = useRouter();

    const captureImage = async () => {
        if (!employeeId) {
            setError("Employee ID is required before capturing the image.");
            return;
        }
        const jwt = localStorage.getItem('jwt')
        const employeeResponse = await axios.get(
            `https://school-project-backend-p17b.onrender.com/api/v1/employee/employee-mgmt/employees/${employeeId}`,
            {
              headers: {
                'Authorization': `Bearer ${jwt}`
              }
            }
        );
        setEmployee(employeeResponse.data.data);
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const handleRetake = () => {
        setCapturedImage(null);
    };

    const uploadBase64Image = async (base64String) => {
        try {
            const imageBlob = await convertBase64ImageToJpg(base64String)
            const formData = new FormData();
            formData.append("file", imageBlob, "file");
            return formData;
        } catch (error) {
            console.error("Error during image processing:", error.message);
            return null;
        }
    };

    const compareImages = async () => {
        if (!capturedImage) {
            setError("Image is required for comparison.");
            return;
        }
        const formData = await uploadBase64Image(capturedImage)
        const jwt = localStorage.getItem('jwt')
        setIsLoading(true);
        try {
            const apiUrl =
                `https://school-project-backend-p17b.onrender.com/api/v1/employee/employee-mgmt/upload-face/${employeeId}`
            await axios.post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${jwt}` },
            });

            const response = await axios.post(
                `https://school-project-backend-p17b.onrender.com/api/v1/employee/employee-mgmt/compare-face/${employeeId}`, {},
                { headers: { 'Authorization': `Bearer ${jwt}` } }
            );
            const confidence = response.data.data.confidence
            if (confidence && confidence >= 75 ) {
                setSuccess(`Images match with confidence level of ${confidence}`)
                setIsLoading(false)
                setTimeout(() => {
                router.push(`/dashboard`);
                }, 3600);
            } else {
                setError("Images do not match.");
            }
        } catch (err) {
            console.error("Error comparing images:", err);
            setError("Failed to compare images. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && (
                <FlashBanner
                    message={error}
                    type="error"
                    onClose={() => setError(null)}
                />
            )}
            {success && (
                <FlashBanner
                    message={success}
                    type="success"
                    onClose={() => setSuccess(null)}
                />
            )}

            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-purple-600">Teklyn Employee Face Verification</h1>
                {/* Employee ID Input */}
                <div className="mb-6 w-full md:w-1/2">
                    <label htmlFor="employeeId" className="block mb-2 text-sm font-medium text-gray-700">
                        Enter Employee ID:
                    </label>
                    <input
                        type="text"
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="e.g., EMP12345"
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    />
                </div>

                {!capturedImage ? (
                    <div className="mb-6">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="rounded-lg shadow-lg"
                        />
                        <button
                            onClick={captureImage}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Capture Image
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 py-6">
                        <div className=" flex ">
                        <img
                            src={capturedImage}
                            alt="Captured"
                            className="mt-2 mx-2 w-48 h-48 rounded-lg shadow-lg"
                        />
                        <img
                            src={employee?.photo?.url}
                            alt="Captured"
                            className="mt-2 w-48 h-48 rounded-lg shadow-lg"
                        />
                        </div>
                        <button
                            onClick={handleRetake}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Retake
                        </button>
                    </div>
                )}

                {isLoading && <LoadingSpinner />} <br /><br />

                <button
                    onClick={compareImages}
                    className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
                    disabled={!employeeId}
                >
                    Verify Image
                </button>
            </div>
        </>
    );
}

export default function CameraCaptureUpload() {
    return (
        <Suspense>
        <CaptureUpload />
        </Suspense>
    )
}