"use client";
import React from "react";
import { Select } from "antd";

interface SelectInputProps {
	options: { value: string; label: string }[];
	placeholder: string;
	onChange: (value: string) => void; // Add onChange prop
}

const SelectInput: React.FC<SelectInputProps> = ({
	options,
	placeholder,
	onChange,
}) => {
	return (
		<Select
			showSearch
			placeholder={placeholder}
			filterOption={(input, option) =>
				(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			}
			options={options}
			className="h-12"
			onChange={onChange}
		/>
	);
};

export default SelectInput;
