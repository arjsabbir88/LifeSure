// components/PolicyPDF.jsx
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
});

export default function PolicyPDF({ policy }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Policy Application Summary</Text>

        <Text style={styles.subheading}>Applicant Information</Text>
        <Text><Text style={styles.label}>Name:</Text> {policy.firstName} {policy.lastName}</Text>
        <Text><Text style={styles.label}>Date of Birth:</Text> {policy.dateOfBirth}</Text>
        <Text><Text style={styles.label}>Email:</Text> {policy.email}</Text>
        <Text><Text style={styles.label}>Phone:</Text> {policy.phone}</Text>
        <Text><Text style={styles.label}>Occupation:</Text> {policy.occupation}</Text>
        <Text><Text style={styles.label}>Annual Income:</Text> ${policy.annualIncome}</Text>
        <Text><Text style={styles.label}>Marital Status:</Text> {policy.maritalStatus}</Text>
        <Text><Text style={styles.label}>Nationality:</Text> {policy.nationality}</Text>

        <Text style={styles.subheading}>Address</Text>
        <Text><Text style={styles.label}>Street:</Text> {policy.streetAddress}</Text>
        <Text><Text style={styles.label}>City:</Text> {policy.city}</Text>
        <Text><Text style={styles.label}>State:</Text> {policy.state}</Text>
        <Text><Text style={styles.label}>Zip Code:</Text> {policy.zipCode}</Text>
        <Text><Text style={styles.label}>Country:</Text> {policy.country}</Text>

        <Text style={styles.subheading}>Health & Lifestyle</Text>
        <Text><Text style={styles.label}>Health Conditions:</Text> {policy.healthConditions.join(", ")}</Text>
        <Text><Text style={styles.label}>Current Medications:</Text> {policy.currentMedications}</Text>
        <Text><Text style={styles.label}>Exercise Frequency:</Text> {policy.exerciseFrequency}</Text>
        <Text><Text style={styles.label}>Smoking Status:</Text> {policy.smokingStatus}</Text>
        <Text><Text style={styles.label}>Alcohol Consumption:</Text> {policy.alcoholConsumption}</Text>
        <Text><Text style={styles.label}>Family Medical History:</Text> {policy.familyMedicalHistory}</Text>
        <Text><Text style={styles.label}>Additional Info:</Text> {policy.additionalHealthInfo}</Text>

        <Text style={styles.subheading}>Nominee Details</Text>
        <Text><Text style={styles.label}>Name:</Text> {policy.nomineeFirstName} {policy.nomineeLastName}</Text>
        <Text><Text style={styles.label}>Relationship:</Text> {policy.relationship}</Text>
        <Text><Text style={styles.label}>Date of Birth:</Text> {policy.nomineeDateOfBirth}</Text>
        <Text><Text style={styles.label}>Email:</Text> {policy.nomineeEmail}</Text>
        <Text><Text style={styles.label}>Phone:</Text> {policy.nomineePhone}</Text>
        <Text><Text style={styles.label}>Occupation:</Text> {policy.nomineeOccupation}</Text>
        <Text><Text style={styles.label}>Address:</Text> {policy.nomineeAddress}</Text>

        <Text style={styles.subheading}>Policy Summary</Text>
        <Text><Text style={styles.label}>Policy Name:</Text> {policy.policyDetails?.policyTitle}</Text>
        <Text><Text style={styles.label}>Coverage:</Text> {policy?.policyDetails?.coverageRange}</Text>
        <Text><Text style={styles.label}>Duration:</Text> {policy.policyDetails.duration}</Text>
        <Text><Text style={styles.label}>Estimated Premium (Monthly):</Text> ${policy.estimatedPremiumMonthly}</Text>
        <Text><Text style={styles.label}>Estimated Premium (Annually):</Text> ${policy.estimatedPremiumAnnul}</Text>

        <Text style={styles.subheading}>Admin Feedback</Text>
        <Text><Text style={styles.label}>Status:</Text> {policy?.status}</Text>
        <Text><Text style={styles.label}>Feedback:</Text> {policy?.adminFeedback}</Text>
      </Page>
    </Document>
  );
}
