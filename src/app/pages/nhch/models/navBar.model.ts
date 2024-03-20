// navbar.model.ts

export interface ChildItem {
  id: number;
  childName: string;
}

export interface SidebarItem {
  id: number;
  name: string;
  child: ChildItem[];
}

export interface NavbarItem {
  id: number;
  name: string;
  sideBar: SidebarItem[];
}
