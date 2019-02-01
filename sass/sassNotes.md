#SASS NOTES

## Nesting and Scoping

height with vh, makes the elements to fit in the page
You can nest elements in order to avoid overwritting classes

```css
.container {
  // Just need to put container once and not repeat elements
  max-width: 600px;
  .sidebar {
    width: 200px;
    float: left;
  }
}
```

### Direct descendant

Only divs that are inmediat children of x

```css
.container {
  // Only inmediat children
  > .left-area {
    ...;
  }
}
```

### Parent selector(&)

Ideal for modifiers, where we have flags

```html
<div class="container right-nav">...</div>
```

```scss
.container {
  &.right-nav {
    color: #333;
  }
}
```

Equivalent in css to

```scss
.container.right-nav {
  color: #333;
}
```

```scss
.button {
  color: #333;
  .theme-dark & {
    color: #fff;
  }
}
```

### Variables and comments

Variables works with a \$ sign.
First we need to import relative route without the extension. @import '';
Sass also has predefined functions to help doing stuff

```scss
$dark-color:#aaa;
darken($dark-color,20%);

/**
*
*/
Hue is #{hue(green)}

```

### Mixins

Mixins allows to reuse of styling. Are blocks of styles that can be reused.
Like variables, should be used separately. We use the @include to call them

```scss
@mixin alert-text($color) {
  background-color: $color;
  color: white;
  font-variant: small-caps;
}

.error-text {
  @include alert-text;
}
```

Other way to separate file

```_mixins.scss
@mixin alert(){
  .alert-message{
    @content;
  }

}
_app.scss
@include alert(){
  background-color: $color;
  color: white;
  font-variant: small-caps;
}
.error-text {
  @include alert-text;
}
```

### Functions

There are some predefined functions in sass (http://sass-lang.com/documentation/Sass/Script/Functions.html)
Some predefined functions:
adjust-hue($color,$degrees);
darken($color,$percent); To change brighness
lighten($color,$percent); To change brighness
saturate($color,$percent); To change saturation
desaturate($color,$percent); To change saturation

```scss
mixins.scss
@mixin theme($primary-color, $rotate: 120deg, $darkenpct: 20%) {
  $other-color: adjust-hue($primary-color, $rotate);
  $other2-color: adjust-hue($primary-color, 180deg);
  $secondary-color: adjust-hue($primary-color, -$rotate);

  .btn-primary {
    @include btn-base($primary-color);
  }

  .btn-secondary {
    @include btn-base($secondary-color);
  }

  .btn-other {
    @include btn-base($other-color);
  }

  .btn-primary {
    @include btn-base($other2-color);
  }
}

@mixin btn-base($bg) {
  background-color: $bg;
  border-color: darken($bg, 20%);
  &:hover {
    background: saturate($bg, 20%);
  }
}



app.scss
@import "_variables";
@import "_mixins";

.btn {
  padding: 2px 10px;
  border: 1px solid transparent;
  border-radius: 2px;
  color: #fff;
  &:hover:not(:disabled) {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
  }
  &:disabled {
    color: #666;
    opacity: 0.5;
  }
}

.theme-1 {
  @include theme(#399, 100deg);
}

.theme-2 {
  @include theme(#609, $darkenpct: 10%);
}

.theme-3 {
  @include theme($hopbush);
}
```

### control-flow if

You can introduce conditionals for example

```scss
@mixin button-base($color) {
  background-color: $color;
  border-color: darken($color, 20%);
  @if (lightness($color) < 70%) {
    color: white;
  }
  &:hover:not(:disabled) {
    background-color: lighten(saturate($color, 20%), 10%);
  }
}
```

### control-flow for
