# DevOps Portfolio — Angular · .NET · Kubernetes · CI/CD

Proyecto de **portfolio DevOps** que implementa un flujo completo y real de
**CI/CD sobre Kubernetes**, utilizando Docker, Helm y GitHub Actions.

El foco del proyecto no es la aplicación en sí, sino **la automatización,
la trazabilidad de despliegues y la separación de entornos**, tal y como se
trabaja en un entorno profesional.

---

## 🧩 Tecnologías utilizadas

- **Frontend**: Angular (servido con NGINX)
- **Backend**: API REST en .NET 8
- **CI/CD**: GitHub Actions
- **Contenedores**: Docker
- **Registry**: GitHub Container Registry (GHCR)
- **Orquestación**: Kubernetes (k3d)
- **Packaging**: Helm

---

## 🏗️ Arquitectura

La arquitectura sigue un enfoque simple pero realista:

- Cada componente se empaqueta como imagen Docker independiente
- El despliegue se realiza mediante Helm Charts
- Kubernetes gestiona escalado y disponibilidad
- GitHub Actions automatiza build y deploy

Flujo general:

git push  
→ GitHub Actions  
→ Build imágenes Docker  
→ Push a GHCR  
→ Helm upgrade  
→ Kubernetes (DEV / PROD)

---

## 🔄 CI/CD Pipeline

El pipeline se ejecuta automáticamente según la rama:

| Rama     | Entorno | Comportamiento |
|----------|---------|----------------|
| develop  | DEV     | 1 réplica |
| master   | PROD    | 2 réplicas |

Características clave:

- Versionado de imágenes por **SHA del commit** (no `latest`)
- Helm parametrizado por entorno
- Despliegue automático sin pasos manuales
- Kubeconfig gestionado como secreto

---

## ☸️ Kubernetes & Helm

Cada servicio dispone de su propio Helm Chart:

helm/
- backend/
  - values.yaml
  - values-dev.yaml
  - values-prod.yaml
- frontend/
  - values.yaml
  - values-dev.yaml
  - values-prod.yaml

Helm controla:
- número de réplicas
- imagen desplegada
- configuración específica por entorno

---

## 🧠 Decisiones técnicas destacadas

- Se evita el uso de `latest` para garantizar **trazabilidad y rollback**
- Separación clara entre CI (build) y CD (deploy)
- Uso de Helm para evitar duplicación de manifests
- Resolución de problemas reales de estado heredado en releases Helm
- Diseño preparado para migrar fácilmente a AKS

---

## ▶️ Ejecución local (resumen)

Requisitos:
- Docker
- k3d
- kubectl
- Helm

Crear cluster:
```bash
k3d cluster create devops-cluster
helm upgrade --install backend helm/backend -n devops
helm upgrade --install frontend helm/frontend -n devops
