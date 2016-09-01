// your code goes here
import {
    NgModule,
    Component,
    EventEmitter
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'io-grandchild1',
    template: `
    <label>Grandchild Input:</label>
    <input type="text" (keyup)="onChange(grandChildInput.value)" #grandChildInput>
  `,
    outputs: ['grandChildChanged']
})
class IOGrandchild1 {
  grandChildChanged = new EventEmitter();

  onChange(value: string){
    this.grandChildChanged.emit(value);
  }
}

@Component({
    selector: 'io-grandchild',
    template: `
    <p>This is the input from the grandparent: {{ parentValue }}</p>
  `,
    inputs: ['parentValue']
})
class IOGrandchild {
    parentValue: string
}

@Component({
    selector: 'io-childSibling1',
    template: `
    <h3>Grandchild to grandparent</h3>
    <p>This is the input from the parent: {{ parentValue }}</p>
    <p>This is the output from grandchild: {{ childValue }}</p>
    <io-grandchild1 class="child2" (grandChildChanged)="onChange($event)"></io-grandchild1>
  `,
    inputs: ['parentValue'],
    outputs: ['gcChanged']
})
class IOChildSibling1 {
    parentValue: string;
    childValue: string;
    gcChanged = new EventEmitter<string>();

    onChange(value: string){
      this.gcChanged.emit(value);
      this.childValue = value;
    }
}

@Component({
    selector: 'io-childSibling',
    template: `
    <h3>Child to child</h3>
    <p>This is the input from the parent: {{ parentValue }}</p>
    <p>This is the output from child 1: {{ siblingVal1 }}</p>
  `,
    inputs: ['parentValue', 'siblingVal1']
})
class IOChildSibling {
    parentValue: string
}

@Component({
    selector: 'io-child',
    template: `
    <h3>Grandparent to grandchild</h3>
    <p>This is the input from the parent: {{ parentValue }}</p>
    <label>Child1 Input:</label>
    <input type="text" #childInput (keyup)="onChange(childInput.value)">
    <io-grandchild class="child2" [parentValue]=parentValue></io-grandchild>
  `,
    inputs: ['parentValue'],
    outputs: ['childChanged']
})
class IOChild {
    parentValue: string;
    childChanged = new EventEmitter<string>();

    onChange(value: string) {
        this.childChanged.emit(value);
    }
}

@Component({
    selector: 'ioApp',
    template: `
    <div class="grandParent">
      <p>This is the output from child1: {{ childValue }}</p>
      <p>This is the output from grandchild: {{ gcValue }} </p>
      <label>Parent Input:</label>
      <input type="text" #parentInput (keyup)="0">

      <io-child class="child1 large"
                [parentValue]="parentInput.value"
                (childChanged)="childValue = $event">
      </io-child>
      <io-childSibling class="child1"
                      [parentValue]="parentInput.value"
                      [siblingVal1]=childValue>
      <!--p> {{ childValue }}</p-->
      </io-childSibling>
      <io-childSibling1 class="child1 large"
                        [parentValue]="parentInput.value"
                        (gcChanged)="gcValue = $event"
                        >
      </io-childSibling1>
    </div>
  `
})
class IOApp {

}
@NgModule({
    declarations: [
        IOApp,
        IOChild,
        IOChildSibling,
        IOChildSibling1,
        IOGrandchild,
        IOGrandchild1
    ],
    imports: [BrowserModule],
    bootstrap: [IOApp]
})
class IOAppModule { }

platformBrowserDynamic().bootstrapModule(IOAppModule);
