import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {
    constructor(private snackbar: MatSnackBar) { }

    openSnackbar(type: string, message: string) {
        // let message = '';
        let panelClass = '';

        switch (type) {
            case 'success':
                message = message;
                panelClass = 'success-snackbar';
                break;
            case 'warning':
                message = message;
                panelClass = 'warning-snackbar';
                break;
            case 'error':
                message = message;
                panelClass = 'error-snackbar';
                break;
            default:
                message = message;
                console.log('default snack panel')
                panelClass = '';
        }


        this.snackbar.open(message, 'Close', {
            panelClass: [panelClass],
            verticalPosition:'top',
            horizontalPosition:'center',
            duration: 3000
        });
    }
}