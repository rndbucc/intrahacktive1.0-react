"use client";
import { useState } from "react";

export default function Registration() {
  interface Member {
    name?: string;
    gSuite?: string;
    phone?: string;
    bracuID?: string;
    level?: string;
  }

  interface FormData {
    teamName: string;
    projectName: string;
    projectPlan: string;
    category: string;
    members: Member[];
  }
  function addMemberFields(numFields: number) {
    const fields = [];

    for (let i = 1; i <= numFields; i++) {
      fields.push(
        <div key={i}>
          <h2 className="text-xl font-bold mb-2">Member {i} Information</h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor={`member${i}Name`} className="block mb-2">
                Name:
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                id={`member${i}Name`}
                name={`member${i}Name`}
                className="block w-full rounded-md border px-4 py-2"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor={`member${i}GSuite`} className="block mb-2">
                G-Suite:
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                id={`member${i}GSuite`}
                name={`member${i}GSuite`}
                className="block w-full rounded-md border px-4 py-2"
                placeholder="john.doe@g.bracu.ac.bd"
                required
              />
            </div>

            <div>
              <label htmlFor={`member${i}Phone`} className="block mb-2">
                Phone No:
              </label>
              <input
                onChange={handleInputChange}
                type="tel"
                id={`member${i}Phone`}
                name={`member${i}Phone`}
                className="block w-full rounded-md border px-4 py-2"
                placeholder="+8801XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label htmlFor={`member${i}BracuID`} className="block mb-2">
                Student ID:
              </label>
              <input
                onChange={handleInputChange}
                type="text"
                id={`member${i}BracuID`}
                name={`member${i}BracuID`}
                className="block w-full rounded-md border px-4 py-2"
                placeholder="20200000"
                required
              />
            </div>

            <div>
              <label htmlFor={`member${i}Level`} className="block mb-2">
                Level:
              </label>
              <select
                onChange={handleInputChange}
                id={`member${i}Level`}
                name={`member${i}Level`}
                className="block w-full rounded-md border px-4 py-2"
                required
              >
                <option value="">Select Level</option>
                <option value="Senior">Senior (Done with CSE370)</option>
                <option value="Junior">Junior (Up to CSE220)</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    return fields;
  }

  const hackathonForm = () => (
    <div className="w-full mb-4">
      <div>
        <label htmlFor="teamName" className="block mb-1">
          Team Name:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          id="teamName"
          name="teamName"
          placeholder="return None"
          required
          className="w-full border rounded-md px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="projectName" className="block mb-1">
          Project Name:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          id="projectName"
          name="projectName"
          placeholder="Club Management System"
          required
          className="w-full border rounded-md px-4 py-2 mb-4"
        />
      </div>
      <div>
        <label htmlFor="projectPlan" className="block mb-1">
          Project Plan (Drive Link):
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          id="projectPlan"
          name="projectPlan"
          placeholder="https://drive.google.com/drive/folders/tDimDbI9AVBm3tx_1Hj9JyLuI4LWeCun"
          required
          className="w-full border rounded-md px-4 py-2 mb-4"
        />
      </div>
      {addMemberFields(3)}
    </div>
  );

  const debuggersForm = () => (
    <div className="w-full mb-4">{addMemberFields(1)}</div>
  );
  const databaseWizards = () => (
    <div className="w-full mb-4">
      <div>
        <label htmlFor="teamName" className="block mb-1">
          Team Name:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          id="teamName"
          name="teamName"
          placeholder="return None"
          required
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      {addMemberFields(2)}
    </div>
  );
  const cPCForm = () => (
    <div className="w-full mb-4">
      <div>
        <label htmlFor="teamName" className="block mb-1">
          Team Name:
        </label>
        <input
          onChange={handleInputChange}
          type="text"
          id="teamName"
          name="teamName"
          placeholder="return None"
          required
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      {addMemberFields(3)}
    </div>
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    projectName: "",
    projectPlan: "",
    category: "",
    members: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("member")) {
      const match = name.match(/member(\d+)([A-Za-z]+)/);
      if (match) {
        const memberIndex = parseInt(match[1], 10) - 1;
        const rawFieldName = match[2];
        const fieldName =
          rawFieldName.charAt(0).toLowerCase() + rawFieldName.slice(1);

        setFormData((prevState) => {
          const updatedMembers = [...prevState.members];

          if (!updatedMembers[memberIndex]) {
            updatedMembers[memberIndex] = {};
          }

          updatedMembers[memberIndex][fieldName as keyof Member] = value;

          return { ...prevState, members: updatedMembers };
        });
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      category: selectedCategory,
    };

    try {
      console.log("Submitting Form Data:", preparedData);

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preparedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Form submitted successfully!");

        setFormData({
          teamName: "",
          projectName: "",
          projectPlan: "",
          members: [],
          category: "",
        });
        setSelectedCategory("");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div
      id="registrationFormContainer"
      className="container mx-auto p-4 flex flex-col items-center"
    >
      <h1 className="text-2xl font-bold mb-4 primary-color">
        Registration Form
      </h1>

      <div className="bg-yellow-200 mb-4 space-y-4 w-full md:w-1/2 p-4 rounded-md shadow-md">
        <p className="text-sm text-gray-800">
          <strong>Important:</strong> Please ensure that all information
          provided is accurate and valid. Inaccurate or incomplete registrations
          will be considered null and void. Before proceeding, make sure to read
          the{" "}
          <a href="guidelines" className="underline hover:text-blue-600">
            registration guidelines
          </a>
          .
          <br />
          <strong className="primary-color">
            Upon successful registration, you will receive an email
            confirmation. Email sending may take up to 5 to 30 mins. Please
            ensure to check both your inbox and spam folder for this
            confirmation message.
          </strong>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full md:w-1/2 bg-white p-4 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-bold mb-2">
            Choose Category:
          </label>
          <select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            id="category"
            name="category"
            required
            className="w-full border rounded-md px-4 py-2"
          >
            <option value="">Select Category</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Debuggers">Debuggers</option>
            <option value="Database Wizards">Database Wizards</option>
            <option value="CPC">CPC</option>
          </select>
        </div>

        {selectedCategory === "Hackathon" && hackathonForm()}
        {selectedCategory === "Debuggers" && debuggersForm()}
        {selectedCategory === "Database Wizards" && databaseWizards()}
        {selectedCategory === "CPC" && cPCForm()}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}