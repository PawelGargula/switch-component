import Switch from "./components/switch";
import { FormSchema } from "./models/form";
import { useState } from "react";

type FormState = {
  errors?: {
    name?: string[];
    lastName?: string[];
    email?: string[];
    agreement?: string[];
  };
  message?: string | null;
}

const initialFormState: FormState = {
  errors: {},
  message: null,
};

function App() {
  const [agreement, setAgreement] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const validatedFields = FormSchema.safeParse({
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      agreement: agreement
    });

    // If form validation fails
    if (!validatedFields.success) {
      setFormState({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Failed to submit form.',
      });
    } else {
      setFormState({
        errors: {},
        message: null,
      });
      alert('Form validated successfully');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center">Switch component example</h1>
      <form aria-describedby="form-error" onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
          <input aria-describedby='name-error' type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {formState.errors?.name &&
              formState.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name:</label>
          <input aria-describedby="last-name-error" type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div id="last-name-error" aria-live="polite" aria-atomic="true">
            {formState.errors?.lastName &&
              formState.errors.lastName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
          <input aria-describedby="email-error" type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {formState.errors?.email &&
              formState.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <Switch id="agreement" label="Agreement to processing personal data" value={agreement} setValue={setAgreement} errors={formState.errors?.agreement}/>
        <button 
          type="submit" 
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
        {/* Error summary */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
            {formState.message && 
                <p className="mt-2 text-sm text-red-500">
                  {formState.message}
                </p>
            }
          </div>
      </form>
    </>
  )
}

export default App
