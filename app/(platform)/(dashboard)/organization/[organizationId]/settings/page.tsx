import { OrganizationProfile } from "@clerk/nextjs"

const SettingsPage = () => {
    return(
        <div className="">
        <OrganizationProfile
        appearance={{
            elements:{
                rootBox:{
                    boxShadow: 'none !important',
                    width:"100%"
                },
                cardBox: {
                    border:"1px solid #e5e5e5",
                    boxShadow: 'none !important',
                    width:"100%"
                }
            }
        }}/>
        </div>
    )
}

export default SettingsPage