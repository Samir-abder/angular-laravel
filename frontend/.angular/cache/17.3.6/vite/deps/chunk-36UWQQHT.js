import {
  DomHandler
} from "./chunk-LZMSIMQG.js";
import {
  CommonModule
} from "./chunk-XAS4SJBG.js";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  InputFlags,
  NgModule,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵlistener
} from "./chunk-X6RUONED.js";

// node_modules/primeng/fesm2022/primeng-focustrap.mjs
var FocusTrap = class _FocusTrap {
  /**
   * When set as true, focus wouldn't be managed.
   * @group Props
   */
  pFocusTrapDisabled = false;
  host = inject(ElementRef);
  onkeydown(e) {
    if (this.pFocusTrapDisabled !== true) {
      e.preventDefault();
      const focusableElement = DomHandler.getNextFocusableElement(this.host.nativeElement, e.shiftKey);
      if (focusableElement) {
        focusableElement.focus();
        focusableElement.select?.();
      }
    }
  }
  static ɵfac = function FocusTrap_Factory(t) {
    return new (t || _FocusTrap)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _FocusTrap,
    selectors: [["", "pFocusTrap", ""]],
    hostAttrs: [1, "p-element"],
    hostBindings: function FocusTrap_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("keydown.tab", function FocusTrap_keydown_tab_HostBindingHandler($event) {
          return ctx.onkeydown($event);
        })("keydown.shift.tab", function FocusTrap_keydown_shift_tab_HostBindingHandler($event) {
          return ctx.onkeydown($event);
        });
      }
    },
    inputs: {
      pFocusTrapDisabled: [InputFlags.HasDecoratorInputTransform, "pFocusTrapDisabled", "pFocusTrapDisabled", booleanAttribute]
    },
    features: [ɵɵInputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrap, [{
    type: Directive,
    args: [{
      selector: "[pFocusTrap]",
      host: {
        class: "p-element"
      }
    }]
  }], null, {
    pFocusTrapDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    onkeydown: [{
      type: HostListener,
      args: ["keydown.tab", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.shift.tab", ["$event"]]
    }]
  });
})();
var FocusTrapModule = class _FocusTrapModule {
  static ɵfac = function FocusTrapModule_Factory(t) {
    return new (t || _FocusTrapModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _FocusTrapModule,
    declarations: [FocusTrap],
    imports: [CommonModule],
    exports: [FocusTrap]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FocusTrapModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      exports: [FocusTrap],
      declarations: [FocusTrap]
    }]
  }], null, null);
})();

export {
  FocusTrap,
  FocusTrapModule
};
//# sourceMappingURL=chunk-36UWQQHT.js.map
