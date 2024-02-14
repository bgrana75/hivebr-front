'use client';
import { Client, Signature, PublicKey, cryptoUtils } from '@hiveio/dhive';

export default function Login ({ setUser }) {

    async function login (formData) { 
        formData.preventDefault();
        const username = formData.target.username.value;
        if (!window.hive_keychain) {
            alert('Please install Hive Keychain first')
            return
        }
      
        if (!formData.target.username.value) {
            alert('Please enter your username')
            return
        }

        return new Promise((resolve, reject) => {
            try {
              const dhiveClient = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network'])
              const memo = username + Date.now()
              window.hive_keychain.requestSignBuffer(username, memo, 'Posting', (response) => {
                if (response.success === true) {
                  const publicKey = response.publicKey
                  dhiveClient.keys.getKeyReferences([publicKey]).then((val) => {
                    const accountName = val.accounts[0][0]
                    if (accountName === username) {
                      const sig = Signature.fromString(response.result)
                      const key = PublicKey.fromString(publicKey)
                      if (key.verify(cryptoUtils.sha256(memo), sig) === true) {
                        dhiveClient.database.getAccounts([accountName]).then(
                          (val2) => {
                            let userInfo = JSON.stringify(val2[0])
                            window.localStorage.setItem('user', userInfo)
                            // console.log(JSON.stringify(val2[0], null, 4))
                            setUser(userInfo)
                            document.getElementById('login_modal').checked = false;
                            resolve(true)
                          }
                        )
                      } else {
                        console.log('error')
                      }
                    } else {
                      console.log('Public Key and Username dont match')
                    }
                  })
                }
              })
            } catch (error) {
              console.log('Error:', error)
            }
        })
    }

    return (
        <>
            <label htmlFor="login_modal" className="btn">Login</label>
            <input type="checkbox" id="login_modal" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">

                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                       <h1 className="text-xl font-semibold text-center">Login with Keychain</h1>
                        <form onSubmit={login} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Username</span>
                                </label>
                                <input name="username" type="text" placeholder="username" className="w-full input input-bordered input-primary" />
                            </div>
                            <div>
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </>
    );
}