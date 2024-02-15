export function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        {new Date().getFullYear()} © {import.meta.env.VITE_APP_NAME}.
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-right d-none d-sm-block">
                            Crafted with <i className="mdi mdi-heart text-danger"></i> by Digit
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
    
}