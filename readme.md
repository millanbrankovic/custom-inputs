# Custom Inputs

Default checkboxes and radio buttons are quite plain and their appearance can't be easily customized - at least it was the case in the past. Luckily, CSS3 offers a good solution - <a href="http://www.w3.org/TR/selectors/#checked" target="_blank">:checked</a> pseudo class.

##### Demo

Demo is available [here](http://milanbrankovic.com/demos/custom-inputs)

## The technique under the hood

####HTML

For this example I was using the following HTML markup:

```html
<div class="custom-input">
    <input class="custom-input-input" type="checkbox" name="input-1" value="value" id="input-1">
    <label class="custom-input-label custom-input-label--check" for="input-1"></label>
</div>
```

####CSS

##### Step 1
Hide all the original inputs with `visibility` property - not with `display: none`. In order for inputs to catch `click` event (i.e. become checked/unchecked) it's necessary to hide them using visibility property. If element is hidden through `display: none`, its clickable area is also removed from the page, which makes event triggering (clicking) impossible.
In this case I just hid input elements with class `.custom-input-input`

```css
.custom-input {
    position: relative;
}

.custom-input-input {
    visibility: hidden;
    position: absolute;
}
```

##### Step 2
Target `label` with an adjacent selector `+`.

```css
+ .custom-input-label {
    display: flex;
    cursor: pointer;
    user-select: none;
    position: relative;
    
    &::before,
    &::after {
        content: "";
        transition: var(--transition);
    }
}
```

##### Step 3
Next step is to target a `::before` and `::after` pseudo selectors and be creative as much as possible since these selectors will appear instead of the default checkboxes and radio buttons. Since I was using a BEM approach I added a modifier class `--check` to `.custom-input-label` and targeted its `::before` and `::after` selectors.

```css
.custom-input-label--check {
    &::before {
        width: 18px;
        height: 18px;
        display: inline-block;
        border: var(--border);
        background-color: white;
        border-radius: var(--radius);
    }

    &::after {
        top: 0;
        left: 0;
        position: absolute;
    }
}
```

##### Step 4
The final step and the most important is `:checked` pseudo class.

```css
:checked {
    + .custom-input-label--check {
        &::before {
            border-color: var(--brand-green);
            background-color: var(--brand-green);
        }

        &::after {
            width: 18px;
            height: 18px;
            background: svg-load("ico-checkmark.svg", fill: white) no-repeat center center;
        }
    }
}
```


##### Complete chunk of css code

```css
.custom-input {
    position: relative;
}

.custom-input-input {
    visibility: hidden;
    position: absolute;
    
    + .custom-input-label {
        display: flex;
        cursor: pointer;
        user-select: none;
        position: relative;

        &::before,
        &::after {
            content: "";
            transition: var(--transition);
        }
        
        &--check {
            &::before {
                width: 18px;
                height: 18px;
                display: inline-block;
                border: var(--border);
                background-color: white;
                border-radius: var(--radius);
            }

            &::after {
                top: 0;
                left: 0;
                position: absolute;
            }
        }
    }
    
    &:checked {
        + .custom-input-label {
            &--check {
                &::before {
                    border-color: var(--brand-green);
                    background-color: var(--brand-green);
                }

                &::after {
                    width: 18px;
                    height: 18px;
                    background: svg-load("ico-checkmark.svg", fill: white) no-repeat center center;
                }
            }
        }
    }
}
```

##### This works perfectly in latest versions of following browsers:
- Firefox
- Chrome
- Safari
- Android
- IE11, IEedge

There are four separated css files used in this demo. All files are placed in the `app/assets/css/components/` and named as modifier classes `custom-input.css`, `custom-input-label--check.css`, `custom-input-label--slide.css`, `custom-input-label--radio.css`

##### Demo

Demo is available [here](http://milanbrankovic.com/demos/custom-inputs)
