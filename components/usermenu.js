export default function UserMenu ({ user, setUser }) {
    let json_metadata = JSON.parse(user.posting_json_metadata);
    function logout () {
        window.localStorage.removeItem('user');
        setUser(null)
    }
    return (
        <>
            <div className="dropdown dropdown-end m-2">
                <span>{user.name}</span>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Profile Picture" src={json_metadata.profile.profile_image} />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <span>{user.balance}</span>
                    </li>
                    <li>
                        <span>{user.hbd_balance}</span>
                    </li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </>
    );
}