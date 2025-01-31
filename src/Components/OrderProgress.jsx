import React from "react";
import { Stepper, Step, StepLabel, StepConnector } from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StepIcon from "@mui/material/StepIcon";

// Custom Connector
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 20, // Adjust to align with larger icons
  },
  active: {
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
    },
  },
  completed: {
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
    },
  },
  line: {
    borderColor: theme.palette.grey[400],
    borderWidth: 2,
  },
}));

// Custom Step Icon
const CustomStepIcon = ({ active, completed, icon }) => {
  const Icon = completed ? CheckCircleIcon : CancelIcon;

  return (
    <Icon
      style={{
        fontSize: "40px", // Adjust size of the icon here
        color: completed ? "#4caf50" : "#f44336",
      }}
    />
  );
};

const OrderProgress = () => {
  const steps = [
    { label: "Order Placed", date: "27 Jan, 09:25 AM", completed: true },
    { label: "Order Processed", date: "27 Jan, 09:35 AM", completed: true },
    { label: "Order Cancelled", date: "27 Jan, 09:58 AM", completed: false },
  ];

  return (
    <div className="p-6">
      <Stepper
        alternativeLabel
        activeStep={steps.findIndex((step) => !step.completed)}
        connector={<CustomConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={step.completed}>
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon
                  {...props}
                  active={props.active}
                  completed={step.completed}
                />
              )}
            >
              <div>
                <span className="font-bold">{step.label}</span>
                <br />
                <span className="text-sm text-gray-500">{step.date}</span>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderProgress;
