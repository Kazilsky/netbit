export function ProfileButton() {
  return <button variant="filled">профиль</button>;
}
export function ThemesButton() {
    return <button variant="filled">темы</button>;
  }

const Settings = () => {
    return (
        <div className="flex justify-center items-center gap-2">
            <ProfileButton/>
            <ThemesButton />
        </div>
    )
}

export default Settings;

