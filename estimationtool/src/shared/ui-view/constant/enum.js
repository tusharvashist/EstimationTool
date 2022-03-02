export const USER_PERMISSIONS = {
  // client permission
  client_view: "clientView",
  client_create: "clientCreate",
  client_listing: "clientListing",
  client_edit: "clientUpdate",
  client_delete: "clientDelete",
  // project permission
  project_view: "projectView",
  project_edit: "projectUpdate",
  project_listing: "projectListing",
  project_delete: "projectDelete",
  project_create: "projectCreate",
  project_requirement_create: "projectRequirementCreate",
  project_requirement_edit: "projectRequirementEdit",
  project_requirement_import: "projectRequirementImport",
  project_requirement_delete: "projectRequirementDelete",

  // estimation permission
  estimation_view: "estimationView",
  // estimation_edit: "estimationUpdate",
  estimation_list: "estimationListing",
  estimation_delete: "estimationDelete",
  estimation_create: "estimationCreate",
  estimation_configuation: "estimationConfiguation",
  estimation_attribute_data: "estimationAttributeData",
  estimation_calc_attribute_data: "estimation_calc_attribute_data",
  estimation_export_excel: "estimation_export_excel",
  estimation_generate_resourcemix: "estimation_generate_resourcemix",
  estimation_generate_timeline: "estimation_generate_timeline",
  estimation_export_resourcemix: "estimation_export_resourcemix",
  estimation_export_timeline: "estimation_export_timeline",
  estimation_share: "estimation_share", // Not implemented
  estimation_requirement_add: "estimation_requirement_add",
  estimation_pricing_view: "estimation_pricing_view",
  estimation_add_review_comment: "estimation_add_review_comment", // Not implemented
  estimation_resourcecount_edit: "estimation_resourcecount_edit",
};

export const ESTIMATION_PERMISSION = {
  estimation_view: false,
  estimation_list: false,
  estimation_delete: false,
  estimation_create: false,
  estimation_configuation: false,
  estimation_attribute_data: false,
  estimation_calc_attribute_data: false,
  estimation_export_excel: false,
  estimation_generate_resourcemix: false,
  estimation_generate_timeline: false,
  estimation_export_resourcemix: false,
  estimation_export_timeline: false,
  estimation_share: false, // Not implemented
  estimation_requirement_add: false,
  estimation_pricing_view: false,
  estimation_add_review_comment: false, // Not implemented
  estimation_resourcecount_edit: false,
};
