import { useEffect, useState } from "react";

const AdvancedPolicyFields = ({ onChange }) => {
  const [eligibility, setEligibility] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [claimProcess, setClaimProcess] = useState([]);
  const [factors, setFactors] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const [input, setInput] = useState({
    eligibility: "",
    benefits: "",
    exclusions: "",
    claimProcess: "",
    factors: "",
    discounts: "",
  });

  const handleAdd = (type) => {
    if (!input[type]?.trim()) return;

    const updateFn = {
      eligibility: setEligibility,
      benefits: setBenefits,
      exclusions: setExclusions,
      claimProcess: setClaimProcess,
      factors: setFactors,
      discounts: setDiscounts,
    };

    const currentList = {
      eligibility,
      benefits,
      exclusions,
      claimProcess,
      factors,
      discounts,
    };

    updateFn[type]([...currentList[type], input[type].trim()]);
    setInput({ ...input, [type]: "" });
  };

  const handleRemove = (type, index) => {
    const updateFn = {
      eligibility: setEligibility,
      benefits: setBenefits,
      exclusions: setExclusions,
      claimProcess: setClaimProcess,
      factors: setFactors,
      discounts: setDiscounts,
    };

    const currentList = {
      eligibility,
      benefits,
      exclusions,
      claimProcess,
      factors,
      discounts,
    };

    const updated = [...currentList[type]];
    updated.splice(index, 1);
    updateFn[type](updated);
  };

  // auto update to parent
useEffect(() => {
  if (onChange) {
    onChange({
      eligibility,
      benefits,
      exclusions,
      claimProcess,
      premiumCalculation: {
        factors,
        discounts,
      },
    });
  }
}, [eligibility, benefits, exclusions, claimProcess, factors, discounts]);

  const renderField = (label, type, list) => (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input[type]}
          onChange={(e) => setInput({ ...input, [type]: e.target.value })}
          className="border p-2 rounded w-full"
          placeholder={`Add ${label.toLowerCase()}...`}
        />
        <button
          type="button"
          onClick={() => handleAdd(type)}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul className="mt-2 space-y-1">
        {list.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 p-2 rounded flex justify-between items-center"
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => handleRemove(type, index)}
              className="text-red-500 font-bold"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      {renderField("Eligibility", "eligibility", eligibility)}
      {renderField("Benefits", "benefits", benefits)}
      {renderField("Exclusions", "exclusions", exclusions)}
      {renderField("Claim Process", "claimProcess", claimProcess)}
      {renderField("Premium Factors", "factors", factors)}
      {renderField("Premium Discounts", "discounts", discounts)}
    </div>
  );
};

export default AdvancedPolicyFields;
