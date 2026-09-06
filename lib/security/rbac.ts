export type RoleName = "Super Admin" | "Manager" | "Sales Executive" | "Marketing";

export type Permission =
  | "*"
  | "dashboard.view"
  | "enquiries.view"
  | "enquiries.create"
  | "enquiries.update"
  | "enquiries.delete"
  | "blog.view"
  | "blog.create"
  | "blog.update"
  | "blog.delete"
  | "seo.view"
  | "seo.create"
  | "seo.update"
  | "seo.delete"
  | "settings.manage"
  | "analytics.view"
  | "reports.view"
  | "chats.view"
  | "audit.view";

export const ROLE_PERMISSIONS: Record<RoleName, Permission[]> = {
  "Super Admin": ["*"],
  "Manager": [
    "dashboard.view",
    "enquiries.view",
    "enquiries.create",
    "enquiries.update",
    "enquiries.delete",
    "reports.view",
    "chats.view",
    "analytics.view",
    "blog.view",
    "seo.view",
  ],
  "Sales Executive": [
    "dashboard.view",
    "enquiries.view",
    "enquiries.create",
    "enquiries.update",
    "chats.view",
  ],
  "Marketing": [
    "dashboard.view",
    "blog.view",
    "blog.create",
    "blog.update",
    "blog.delete",
    "seo.view",
    "seo.create",
    "seo.update",
    "seo.delete",
    "analytics.view",
  ],
};

/**
 * Check if a role has the required permission
 */
export function hasPermission(role: RoleName, required: Permission): boolean {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role] || [];
  if (perms.includes("*")) return true;
  return perms.includes(required);
}

/**
 * Resolve all granted permissions for a given role name
 */
export function getRolePermissions(role: RoleName): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}
