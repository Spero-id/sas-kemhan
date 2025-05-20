import FilterNavigation from "./Filter";
import MenuNavigation from "./Menu";

const Navigation = () => {
  return (
    <div className="flex justify-between my-4">
      <MenuNavigation />
      <FilterNavigation />
    </div>
  );
};

export default Navigation;
