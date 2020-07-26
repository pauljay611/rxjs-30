import { fromEvent } from 'rxjs'
import './index.css'

const button = document.querySelector('button')

const $click = fromEvent(button, 'click')

$click.subscribe(() => alert('Errrrrrrr'))
