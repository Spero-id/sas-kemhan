import FilterNavigation from "./Filter";
import MenuNavigation from "./Menu";

const Navigation = ({
  urlManage,
  permissionManage
} : Readonly<{ urlManage: string; permissionManage: string }>) => {
  return (
    <div className="flex justify-between my-4">
      <MenuNavigation />
      <FilterNavigation urlManage={urlManage} permissionManage={permissionManage} />
    </div>
  );
};

export default Navigation;
