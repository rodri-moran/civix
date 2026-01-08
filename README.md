# Civix – Plataforma de Gestión de Incidentes Urbanos

**Civix** es una plataforma web full-stack que permite a los ciudadanos reportar incidentes urbanos  
(baches, luminarias rotas, veredas dañadas, etc.) y a los municipios gestionarlos de forma organizada,  
asignando cuadrillas, recursos y realizando seguimiento del estado de cada incidente.

Este proyecto fue desarrollado como **Práctica Profesional** de la  
**Tecnicatura Universitaria en Programación – UTN FRC**, con un enfoque en  
arquitectura real, seguridad, escalabilidad y experiencia de usuario.

---

##  ¿Qué permite el sistema?

- Registro de incidentes por parte de los ciudadanos
- Clasificación y gestión de reportes por parte de la administración
- Asignación de cuadrillas o áreas de servicio
- Gestión de recursos e inventario
- Seguimiento de estados y tiempos de resolución
- Notificación automática al ciudadano sobre cambios de estado
- Generación de métricas y reportes para la toma de decisiones

El objetivo principal es **mejorar la comunicación entre ciudadanos y las autoridades**,  
optimizar la gestión interna de incidentes urbanos y brindar información útil  
para la planificación y eficiencia de los servicios públicos.

---

##  Seguridad

- Autenticación basada en **JWT**
- Control de acceso por **roles**
- Rutas protegidas en frontend y backend
- Validación de token en cada request

---

##  Arquitectura

- Backend desacoplado (API REST)
- Separación clara de responsabilidades
- Persistencia en base de datos
- Frontend responsive
- Arquitectura preparada para escalar

---

##  Tecnologías utilizadas

### Backend
- Java
- Spring Boot
- Spring Security
- JWT
- JPA / Hibernate
- PostgreSQL

### Frontend
- Angular
- Bootstrap 5
- HTML / CSS / TypeScript

---

##  Infraestructura

- Docker
- Docker Compose
- Variables de entorno
- Deploy en entorno cloud

---

##  Usuarios de prueba

Podés probar la aplicación sin registrarte usando los siguientes perfiles:

### Ciudadano
- Email: `user@test.com`
- Password: `demo123`

### Administrador
- Email: `admin@test.com`
- Password: `demo123`

### Cuadrilla
- Email: `squad@test.com`
- Password: `demo123`

 **Cada rol cuenta con vistas, permisos y funcionalidades diferentes.**

---

##  Funcionalidades por rol

### Ciudadano
- Crear reportes de incidentes urbanos
- Ver el estado de sus reportes
- Acceso seguro mediante autenticación JWT

### Administrador
- Visualizar todos los reportes
- Cambiar estados (Pendiente / En proceso / Resuelto)
- Asignar cuadrillas
- Gestionar inventario de recursos
- Administración general del sistema

### Supervisor de cuadrilla
- Ver reportes asignados a sus cuadrillas
- Cambiar estado de los reportes
- Registrar recursos utilizados
- Visualizar cuadrillas a su cargo

---

##  Mejoras futuras
- Recuperación de contraseña vía email
- Notificaciones automáticas
- Historial detallado de cambios de estado
- Auditoría de acciones

---

##  Autor

**Rodrigo Nicolás Moran**  
Desarrollador Full-Stack

- Email: rodrigomoran143@gmail.com  
- LinkedIn: *www.linkedin.com/in/rodrigo-moran99*  
- GitHub: *https://github.com/rodri-moran*  
