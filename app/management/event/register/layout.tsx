import ProgressNav from "../../../../components/management/ProgressNav";

export default function EventCreateLayout({ children }) {
  return (
    <div className="py-4 px-2">
      <div className="px-2">
        <ProgressNav />
      </div>
      {children}
    </div>
  );
}
