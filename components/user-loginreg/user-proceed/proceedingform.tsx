'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';

interface SellerFormData {
  businessName: string;
  businessType: string;
  taxId: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  zipCode: string;
  partnershipType: string;
  partnershipDetails: string;
  bankProvider: string;
  bankAccountInfo: string;
  businessRegistration: FileList;
  taxDocuments: FileList;
  certifications: FileList;
  additionalDocuments: FileList;
}

type FirstPageFields = keyof Pick<SellerFormData, 
  'businessName' | 
  'businessType' | 
  'taxId' | 
  'contactPerson' |
  'email' |
  'phone' |
  'address' |
  'city' |
  'province' |
  'zipCode'
>;

type SecondPageFields = keyof Pick<SellerFormData,
  'partnershipType' |
  'partnershipDetails' |
  'bankProvider' |
  'bankAccountInfo'
>;

export default function SellerRegistrationForm() {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<SellerFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const onSubmit = async (data: SellerFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate upload progress for documents
      const documentFields = ['businessRegistration', 'taxDocuments', 'certifications', 'additionalDocuments'];
      for (const key of documentFields) {
        const files = data[key as keyof SellerFormData] as FileList;
        if (files && files.length > 0) {
          // Simulate file upload with progress
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(prev => ({
              ...prev,
              [key]: progress
            }));
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }
      
      // Handle form submission here
      console.log(data);
      // Add your API call here
      
      // Reset progress after successful upload
      setUploadProgress({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextPage = async () => {
    if (currentPage === 1) {
      const firstPageFields: FirstPageFields[] = [
        'businessName',
        'businessType',
        'taxId',
        'contactPerson',
        'email',
        'phone',
        'address',
        'city',
        'province',
        'zipCode'
      ];
      
      const isValid = await trigger(firstPageFields);
      
      if (isValid) {
        setCurrentPage(2);
      }
    } else if (currentPage === 2) {
      const secondPageFields: SecondPageFields[] = [
        'partnershipType',
        'partnershipDetails',
        'bankProvider',
        'bankAccountInfo'
      ];
      
      const isValid = await trigger(secondPageFields);
      
      if (isValid) {
        setCurrentPage(3);
      }
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderUploadField = (
    name: keyof Pick<SellerFormData, 'businessRegistration' | 'taxDocuments' | 'certifications' | 'additionalDocuments'>,
    label: string,
    description: string,
    required: boolean = true
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="file"
          multiple
          {...register(name, { required: required ? `${label} is required` : false })}
          className="mt-1 block w-full px-3 py-2 bg-white rounded-md border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
            file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 file:transition-colors"
          disabled={isSubmitting}
        />
        {uploadProgress[name] !== undefined && uploadProgress[name] < 100 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress[name]}%` }}
            />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">{description}</p>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Intro Modal */}
      {showIntroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <svg className="w-14 h-14 text-blue-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="#e0f2fe" />
                  <path d="M16 22h16M16 28h16M24 16v16" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Before we proceed,</h2>
              <p className="text-gray-600 mb-4">
                please make sure you have the necessary documents and information ready. This includes your valid government-issued ID, business permit (if applicable), contact details, and product or service information.
              </p>
              <p className="text-gray-600 mb-4">
                By continuing, you acknowledge that all the information you provide is true and accurate. Our team will review your application, and you will be notified via email or SMS regarding the status of your submission.
              </p>
              <div className="w-full flex justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-cyan-600 hover:to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => { setShowIntroModal(false); setShowPrivacyModal(true); }}
                >
                  Next
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4">Click Next to begin your application.</p>
            </div>
          </div>
        </div>
      )}
      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <svg className="w-14 h-14 text-green-500 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" fill="#dcfce7" />
                  <path d="M16 20h16M16 28h16M24 16v16" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">PRIVACY POLICY</h2>
              <div className="text-gray-700 text-left w-full max-w-2xl mx-auto space-y-3 mb-4 text-sm">
                <p>At <span className="font-semibold">THUMBWORX</span>, we are committed to protecting the privacy of our personnel and job applicants. This Privacy Policy explains how we collect, use, store, and protect your personal information in compliance with the Data Privacy Act of 2012.</p>
                <h3 className="font-semibold text-base mt-2">1. Data We Collect</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Full name, address, contact numbers, email</li>
                  <li>Date of birth, age, gender, height, and weight</li>
                  <li>Government-issued IDs (driver’s license, SSS, PhilHealth, TIN, etc.)</li>
                  <li>Work experience, resume, trainings, and certifications</li>
                  <li>Medical records, especially drug and alcohol test results</li>
                  <li>Emergency contact and related employment documents</li>
                </ul>
                <h3 className="font-semibold text-base mt-2">2. Purpose of Collection</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Manpower profiling and job matching</li>
                  <li>Employment processing and deployment</li>
                  <li>Client compliance and verification</li>
                  <li>Safety, security, and health screening</li>
                  <li>Coordination with contractors and clients for project requirements</li>
                </ul>
                <h3 className="font-semibold text-base mt-2">3. Data Sharing</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Authorized clients and contractors</li>
                  <li>Project partners or affiliates involved in manpower engagements</li>
                  <li>Government agencies, if legally required</li>
                </ul>
                <p>We only share necessary and job-related information, and always on a need-to-know basis.</p>
                <h3 className="font-semibold text-base mt-2">4. Data Storage & Protection</h3>
                <p>All information is stored securely through encrypted systems and/or locked physical files. Access is restricted to authorized personnel only. We implement technical and organizational safeguards to prevent unauthorized access, alteration, or misuse of data.</p>
                <h3 className="font-semibold text-base mt-2">5. Retention Period</h3>
                <p>Your data will be retained only for as long as necessary for employment or legal purposes. After that, it will be securely archived or deleted. You may request for deletion of your data after your engagement ends, subject to certain legal conditions.</p>
                <h3 className="font-semibold text-base mt-2">6. Your Rights</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Access your personal data</li>
                  <li>Correct or update inaccurate information</li>
                  <li>Withdraw your consent at any time</li>
                  <li>Request deletion of your records (subject to legal review)</li>
                </ul>
                <h3 className="font-semibold text-base mt-2">7. How to Contact Us</h3>
                <div className="ml-4">
                  <div><span className="font-semibold">THUMBWORX Data Privacy Office</span></div>
                  <div>Email: <a href="mailto:admin@innovatasolutions.com" className="text-blue-600 underline">admin@innovatasolutions.com</a></div>
                  <div>Mobile: <a href="tel:+639618330336" className="text-blue-600 underline">+63 961 833 0336</a></div>
                  <div>Address: Innovata Office, Bagong Bayan, City of Malolos, Bulacan, Philippines 3000</div>
                </div>
              </div>
              <div className="w-full flex justify-center mt-2">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={() => setShowPrivacyModal(false)}
                >
                  I Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Seller Form</h2>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              currentPage > 1 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${
              currentPage > 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentPage === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentPage === 1 ? (
          <>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-blue-700">Step 1: Business Details</h3>
              <p className="text-gray-500 mt-1">Enter your business and contact information to get started.</p>
            </div>

            <div className="space-y-4 bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessName">Business Name</label>
                  <input
                    id="businessName"
                    type="text"
                    placeholder="e.g. [Your Company Name] Corp./Inc./LLC"
                    {...register('businessName', { required: 'Business name is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter your registered business name.</p>
                  {errors.businessName && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="businessType">Business Type</label>
                  <select
                    id="businessType"
                    {...register('businessType', { required: 'Business type is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.businessType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.5rem_center] text-gray-900`}
                  >
                    <option value="">Select business type</option>
                    <option value="sole_proprietorship">Sole Proprietorship</option>
                    <option value="partnership">General Partnership</option>
                    <option value="limited_partnership">Limited Partnership (LP)</option>
                    <option value="corporation">C Corporation</option>
                    <option value="s_corporation">S Corporation</option>
                    <option value="llc">Limited Liability Company (LLC)</option>
                    <option value="non_profit">Non-Profit Organization</option>
                    <option value="cooperative">Cooperative</option>
                    <option value="joint_venture">Joint Venture</option>
                    <option value="franchise">Franchise</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Choose the legal structure of your business.</p>
                  {errors.businessType && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="taxId">Tax ID / EIN</label>
                  <input
                    id="taxId"
                    type="text"
                    placeholder="e.g. 123-456-789-123"
                    pattern="[0-9\-]+"
                    onKeyDown={(e) => {
                      if ([8, 9, 27, 13, 46, 37, 39].includes(e.keyCode) ||
                          (e.keyCode >= 48 && e.keyCode <= 57) ||
                          e.keyCode === 189) {
                        return;
                      }
                      e.preventDefault();
                    }}
                    {...register('taxId', { required: 'Tax ID is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.taxId ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">Enter your business tax identification number.</p>
                  {errors.taxId && (
                    <p className="mt-1 text-sm text-red-600">{errors.taxId.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="contactPerson">Contact Person</label>
                  <input
                    id="contactPerson"
                    type="text"
                    placeholder="e.g. Juan Dela Cruz"
                    {...register('contactPerson', { required: 'Contact person is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">Who should we contact regarding this application?</p>
                  {errors.contactPerson && (
                    <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. [youremail]@[yourcompany].com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">We'll send important updates to this email.</p>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. (+63) 934-1236-567"
                    pattern="[\d\s\(\)\-\+]+"
                    onKeyDown={(e) => {
                      if ([8, 9, 27, 13, 46, 37, 39].includes(e.keyCode) ||
                          (e.keyCode >= 48 && e.keyCode <= 57) ||
                          [32, 40, 41, 45, 43].includes(e.keyCode)) {
                        return;
                      }
                      e.preventDefault();
                    }}
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">A valid phone number for contact.</p>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="e.g. 123 Main St."
                    {...register('address', { required: 'Address is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">Business physical address.</p>
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="e.g. New York"
                      {...register('city', { required: 'City is required' })}
                      className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    />
                    <p className="text-xs text-gray-400 mt-1">City where your business is located.</p>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="province">Province</label>
                    <input
                      id="province"
                      type="text"
                      placeholder="e.g. Laguna"
                      {...register('province', { required: 'Province is required' })}
                      className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.province ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    />
                    <p className="text-xs text-gray-400 mt-1">Province where your business is located.</p>
                    {errors.province && (
                      <p className="mt-1 text-sm text-red-600">{errors.province.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="zipCode">ZIP Code</label>
                    <input
                      id="zipCode"
                      type="text"
                      placeholder="e.g. 10001"
                      pattern="[0-9]+"
                      onKeyDown={(e) => {
                        if ([8, 9, 27, 13, 46, 37, 39].includes(e.keyCode) ||
                            (e.keyCode >= 48 && e.keyCode <= 57)) {
                          return;
                        }
                        e.preventDefault();
                      }}
                      {...register('zipCode', { required: 'ZIP code is required' })}
                      className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                    />
                    <p className="text-xs text-gray-400 mt-1">Postal or ZIP code.</p>
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : currentPage === 2 ? (
          <>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-blue-700">Step 2: Partnership & Bank Details</h3>
              <p className="text-gray-500 mt-1">Tell us about your partnership preferences and payment information.</p>
            </div>

            <div className="space-y-4 bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Partnership Details</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="partnershipType">Partnership Type</label>
                <select
                  id="partnershipType"
                  {...register('partnershipType', { required: 'Partnership type is required' })}
                  className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.partnershipType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5em_1.5em] bg-no-repeat bg-[right_0.5rem_center] text-gray-900`}
                >
                  <option value="">Select partnership type</option>
                  <option value="exclusive">Exclusive Partnership</option>
                  <option value="non_exclusive">Non-Exclusive Partnership</option>
                  <option value="distributor">Authorized Distributor</option>
                  <option value="reseller">Authorized Reseller</option>
                  <option value="wholesale">Wholesale Partner</option>
                  <option value="retail">Retail Partner</option>
                  <option value="dropshipping">Dropshipping Partner</option>
                  <option value="affiliate">Affiliate Partner</option>
                  <option value="strategic">Strategic Partner</option>
                  <option value="technology">Technology Partner</option>
                  <option value="service">Service Provider Partner</option>
                  <option value="manufacturing">Manufacturing Partner</option>
                  <option value="supply_chain">Supply Chain Partner</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Select the type of partnership you are interested in.</p>
                {errors.partnershipType && (
                  <p className="mt-1 text-sm text-red-600">{errors.partnershipType.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="partnershipDetails">Partnership Details</label>
                <textarea
                  id="partnershipDetails"
                  {...register('partnershipDetails', { required: 'Partnership details are required' })}
                  rows={4}
                  placeholder="Please describe your business model and partnership expectations..."
                  className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.partnershipDetails ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900`}
                />
                <p className="text-xs text-gray-400 mt-1">Describe your business model and what you expect from this partnership.</p>
                {errors.partnershipDetails && (
                  <p className="mt-1 text-sm text-red-600">{errors.partnershipDetails.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Bank Account Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="bankProvider">Bank or E-Wallet Provider</label>
                <select
                  id="bankProvider"
                  {...register('bankProvider', { required: 'Bank or E-Wallet provider is required' })}
                  className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.bankProvider ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900`}
                >
                  <option value="">Select provider</option>
                  <option value="Maya Bank">Maya Bank</option>
                  <option value="Tonik Digital Bank">Tonik Digital Bank</option>
                  <option value="UNO Digital Bank">UNO Digital Bank</option>
                  <option value="SeaBank Philippines">SeaBank Philippines</option>
                  <option value="UnionDigital Bank">UnionDigital Bank</option>
                  <option value="GoTyme Bank">GoTyme Bank</option>
                  <option value="Overseas Filipino Bank (OFBank)">Overseas Filipino Bank (OFBank)</option>
                  <option value="CIMB Bank Philippines">CIMB Bank Philippines</option>
                  <option value="GCash">GCash</option>
                  <option value="Maya (e-wallet version of Maya Bank)">Maya (e-wallet version of Maya Bank)</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="GrabPay">GrabPay</option>
                  <option value="Coins.ph">Coins.ph</option>
                  <option value="JuanCash">JuanCash</option>
                  <option value="Bayad">Bayad</option>
                  <option value="PalawanPay">PalawanPay</option>
                  <option value="TayoCash">TayoCash</option>
                  <option value="ML Wallet (by M Lhuillier)">ML Wallet (by M Lhuillier)</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">Choose your bank or e-wallet provider.</p>
                {errors.bankProvider && (
                  <p className="mt-1 text-sm text-red-600">{errors.bankProvider.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="bankAccountInfo">Bank Account Details</label>
                <textarea
                  id="bankAccountInfo"
                  {...register('bankAccountInfo', { required: 'Bank account information is required' })}
                  rows={3}
                  placeholder="Please provide your bank account details for payments..."
                  className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.bankAccountInfo ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900`}
                />
                <p className="text-xs text-gray-400 mt-1">This information will be used for payment processing.</p>
                {errors.bankAccountInfo && (
                  <p className="mt-1 text-sm text-red-600">{errors.bankAccountInfo.message}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold text-blue-700">Step 3: Document Upload</h3>
              <p className="text-gray-500 mt-1">Upload all required documents for your seller verification.</p>
            </div>

            <div className="space-y-6 bg-white rounded-lg shadow p-6 border border-gray-100">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Document Upload</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please upload all required documents for your seller verification
                </p>
              </div>

              {renderUploadField(
                'businessRegistration',
                'Business Registration',
                'Upload your business registration certificate or incorporation documents (PDF, JPG, PNG, max 10MB)'
              )}

              {renderUploadField(
                'taxDocuments',
                'Tax Documents',
                'Upload your tax registration certificate and recent tax returns (PDF, JPG, PNG, max 10MB)'
              )}

              {renderUploadField(
                'certifications',
                'Business Certifications',
                'Upload any relevant business certifications or licenses (PDF, JPG, PNG, max 10MB)'
              )}

              {renderUploadField(
                'additionalDocuments',
                'Additional Documents',
                'Upload any additional supporting documents (PDF, JPG, PNG, max 10MB)',
                false // This field is optional
              )}

              <div className="bg-blue-50 p-4 rounded-md mt-6">
                <h4 className="text-sm font-medium text-blue-900">Important Notes:</h4>
                <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                  <li>All documents should be in PDF, JPG, or PNG format</li>
                  <li>Maximum file size: 10MB per document</li>
                  <li>Ensure all documents are clear and legible</li>
                  <li>Documents in foreign languages should include English translations</li>
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="pt-4 flex space-x-4">
          {currentPage > 1 && (
            <button
              type="button"
              onClick={previousPage}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
          <button
            type={currentPage === 3 ? 'submit' : 'button'}
            onClick={currentPage < 3 ? nextPage : undefined}
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {currentPage === 3 
              ? (isSubmitting ? 'Submitting...' : 'Submit Registration') 
              : 'Next'
            }
          </button>
        </div>
      </form>
    </div>
  );
} 