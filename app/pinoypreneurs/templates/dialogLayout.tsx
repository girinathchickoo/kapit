import * as Mui from "@mui/material"
import * as MuiIcons from "@mui/icons-material"
import * as React from "react"

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <Mui.DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
            {children}
            {onClose ? (
                <Mui.IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <MuiIcons.Close />
                </Mui.IconButton>
            ) : null}
        </Mui.DialogTitle>
    );
};

export const DialogLayout = ({ open, setOpen, title, children }: DialogProps) => {

    const handleClose = () => {
        setOpen(false)
    }

    return <Mui.Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Mui.Typography
                sx={{ fontSize: "1rem", fontWeight: 600, ml: 1 }}
                color="primary"
            >
                {title}
            </Mui.Typography>
        </BootstrapDialogTitle>
        <Mui.DialogContent>
            {children}
        </Mui.DialogContent>
    </Mui.Dialog>
}

export interface DialogProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    children: React.ReactNode
}