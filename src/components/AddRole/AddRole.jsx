import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import roleLabels from "../../utils/roleLabels"; // Importa los nombres amigables
import "./AddRole.css";

function AddRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const username = "hosting55370us";
  const password = "2AOr NmiY rQkn E83v z7Kv GDho";

  const allRoles = [
    "administrator",
    "editor",
    "author",
    "contributor",
    "subscriber",
    "suscriptor_ia_30",
    "suscriptor_ia_90",
    "llamadas-comercia",
    "recordatorios",
    "curso_raul",
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.goldenshark.es/wp-json/custom-api/v1/user/${id}`,
          {
            auth: {
              username,
              password,
            },
          }
        );
        const userRoles = response.data.roles || [];
        const filteredRoles = allRoles.filter(
          (role) => !userRoles.includes(role)
        );
        setUser({ ...response.data, roles: userRoles });
        setAvailableRoles(filteredRoles);
      } catch (err) {
        console.error("Error al obtener los detalles del usuario:", err);
        setError("No se pudo cargar la información del usuario.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleAddRole = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Por favor, selecciona un rol.");
      return;
    }
    try {
      await axios.post(
        "https://www.goldenshark.es/wp-json/custom-api/v1/user/add-role",
        {
          id: id,
          role: selectedRole,
        },
        {
          auth: {
            username,
            password,
          },
        }
      );
      setModalMessage(
        `Rol "${roleLabels[selectedRole] || selectedRole}" agregado correctamente al usuario.`
      );
      setShowModal(true);
      setError(null);
    } catch (err) {
      console.error("Error al agregar el rol:", err);
      setError("No se pudo agregar el rol. Verifica la conexión y los permisos.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="add-role-loading">
        <div className="add-role-alert">Cargando detalles del usuario...</div>
      </div>
    );
  }

  return (
    <div className="add-role-container">
      <h2 className="title">Agregar Rol al Usuario</h2>
      {error && <div className="alert error">{error}</div>}

      {user ? (
        <>
          <p><strong>ID del usuario:</strong> {user.id}</p>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>

          <div className="current-roles">
            <h3>Roles Actuales:</h3>
            {user.roles.length > 0 ? (
              <ul className="roles-list">
                {user.roles.map((role) => (
                  <li key={role} className="role-item">
                    {roleLabels[role] || role}
                  </li>
                ))}
              </ul>
            ) : (
              <p>El usuario no tiene roles asignados.</p>
            )}
          </div>

          <form onSubmit={handleAddRole} className="add-role-form">
            <label htmlFor="roleSelect">Selecciona un rol:</label>
            <select
              id="roleSelect"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">-- Selecciona un rol --</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {roleLabels[role] || role}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-agregar">
              Agregar Rol
            </button>
          </form>
        </>
      ) : (
        <div className="alert error">No se encontró información del usuario.</div>
      )}

      <button onClick={() => navigate(-1)} className="btn-regresar">
        Volver
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmación</h3>
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal} className="btn-cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRole;
