/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All Rights Reserved.
 * See 'LICENSE' in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as vscode from 'vscode';

export class DataBinding<T> {
    private value: T;
    private valueChanged = new vscode.EventEmitter<T>();

    constructor(value: T) {
        this.value = value;
    }

    public get Value(): T {
        return this.value;
    }

    public set Value(value: T) {
        if (value !== this.value) {
            this.value = value;
            this.valueChanged.fire(this.value);
        }
    }

    public get ValueChanged(): vscode.Event<T> {
        return this.valueChanged.event;
    }

    public activate(): void {
        this.valueChanged.fire(this.value);
    }

    public deactivate(): void {
    }

    public dispose(): void {
        this.deactivate();
        this.valueChanged.dispose();
    }
}
