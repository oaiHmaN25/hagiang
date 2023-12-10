import { Metadata } from "next";
import Container from "./Container";
export const metadata: Metadata = {
  title: "Flowchart",
  description: "Flowchart",
};
export default function page() {
  return <Container />;
}
