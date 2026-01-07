export default function handleScrollTo(
  e: React.MouseEvent<HTMLElement>,
  id: string
): void {
  e.preventDefault();

  const selectedSection = document.getElementById(id);

  if (selectedSection) {
    selectedSection.scrollIntoView({ behavior: "smooth" });
  }
}
