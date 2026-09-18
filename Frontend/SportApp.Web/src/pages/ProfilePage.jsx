import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { getCurrentUser, updateCurrentUser } from "../api/userApi"

import { useAuth } from "../context/useAuth"

import "../styles/ProfilePage.css"

function ProfilePage() {
  const { t } = useTranslation()
  const { updateUser } = useAuth()

  const [user, setUser] = useState(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser()

        setUser(userData)
        setFirstName(userData.firstName)
        setLastName(userData.lastName)
        setEmail(userData.email)
      } catch (error) {
        console.error("Get current user error:", error)

        setError(t("profile.loadError"))
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [t])

  const handleEdit = () => {
    setError("")
    setSuccess("")
    setIsEditing(true)
  }

  const handleCancel = () => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)

    setError("")
    setSuccess("")
    setIsEditing(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      const updatedUser = await updateCurrentUser({
        firstName,
        lastName,
        email,
      })

      setUser(updatedUser)
      updateUser(updatedUser)

      setFirstName(updatedUser.firstName)
      setLastName(updatedUser.lastName)
      setEmail(updatedUser.email)

      setIsEditing(false)
      setSuccess(t("profile.saveSuccess"))
    } catch (error) {
      console.error("Update current user error:", error)

      setError(t("profile.saveError"))
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <p>{t("profile.loading")}</p>
  }

  return (
    <div className="profile-page">
      <h1>{t("profile.title")}</h1>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {user && !isEditing && (
        <div>
          <p>
            {t("profile.firstName")}: {user.firstName}
          </p>

          <p>
            {t("profile.lastName")}: {user.lastName}
          </p>

          <p>
            {t("profile.email")}: {user.email}
          </p>

          <button type="button" onClick={handleEdit}>
            {t("profile.edit")}
          </button>
        </div>
      )}

      {user && isEditing && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">{t("profile.firstName")}</label>

            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName">{t("profile.lastName")}</label>

            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">{t("profile.email")}</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isSaving}>
            {isSaving ? t("profile.saving") : t("common.save")}
          </button>

          <button type="button" onClick={handleCancel} disabled={isSaving}>
            {t("common.cancel")}
          </button>
        </form>
      )}
    </div>
  )
}

export default ProfilePage
