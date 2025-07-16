'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SellerFormData {
  businessName: string;
  businessType: string;
  taxId: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  partnershipType: string;
  partnershipDetails: string;
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
  'state' |
  'zipCode'
>;

type SecondPageFields = keyof Pick<SellerFormData,
  'partnershipType' |
  'partnershipDetails' |
  'bankAccountInfo'
>;

export default function SellerRegistrationForm() {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<SellerFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

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
        'state',
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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Seller Registration Form</h2>
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
                    placeholder="e.g. Acme Corp."
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
                    placeholder="e.g. 12-3456789"
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
                    placeholder="e.g. John Doe"
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
                    placeholder="e.g. john@acmecorp.com"
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
                    placeholder="e.g. (555) 123-4567"
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
                  <label className="block text-sm font-medium text-gray-700" htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    placeholder="e.g. NY"
                    {...register('state', { required: 'State is required' })}
                    className={`mt-1 block w-full px-3 py-2 bg-white rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  />
                  <p className="text-xs text-gray-400 mt-1">State or province.</p>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
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