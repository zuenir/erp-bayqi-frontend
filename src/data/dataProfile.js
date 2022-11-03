const profileData = [
  { value: 5150, label: "Administrador" },
  { value: 1984, label: "Comercial" },
  { value: 1990, label: "Inserção" },
  { value: 2055, label: "Publicidade" },
  { value: 2001, label: "User" },
];

const occupationData = [
  { value: "Administrador S.O", label: "Administrador S.O" },
  { value: "Dir. Comercial", label: "Dir. Comercial" },
  { value: "Assitente Comercial", label: "Assitente Comercial" },
  { value: "Gestor de Loja", label: "Gestor de Loja" },
  { value: "Agente Comercial", label: "Agente Comercial" },
  { value: "Agente Publicitário", label: "Agente Publicitário" },
];

const activityData = [
  { value: "BayQi Ponto", label: "BayQi Ponto" },
  { value: "BayQi Marketplace", label: "BayQi Marketplace" },
  { value: "BayQi Publicidade", label: "BayQi Publicidade" },
];

const storeStatusData = [
  { value: "Pendente", label: "Pendente" },
  { value: "Publicado", label: "Publicado" },
  { value: "Removido", label: "Removido" },
];

const getProfileRole = (myRole) => profileData.find((role) => role.value === myRole);

const getProfileLabelRole = (myRole) => profileData.find((role) => role.label === myRole);

const getAllProfileRoles = () => profileData;

const getAllOccupationData = () => occupationData;

const getAllActivityData = () => activityData;

const getAllStoreStatusData = () => storeStatusData;

module.exports = {
  getProfileRole, 
  getProfileLabelRole,
  getAllProfileRoles, 
  getAllOccupationData,
  getAllActivityData,
  getAllStoreStatusData
}