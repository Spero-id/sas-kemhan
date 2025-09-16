import FilterNavigation from "./Filter";
import MenuNavigation from "./Menu";


const Navigation = ({
  urlManage,
  permissionManage
}: Readonly<{ urlManage: string; permissionManage: string }>) => {
  return (
    <div className="flex justify-between my-4">
      <MenuNavigation />
      <div className="hidden md:block">
        <FilterNavigation urlManage={urlManage} permissionManage={permissionManage} />
      </div>

    </div>
  );
};

export default Navigation;
