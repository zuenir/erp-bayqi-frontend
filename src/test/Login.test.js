import {render,screen} from '@testing-library/react';
import Login from '../pages/Login';

test('Teste', () => {
    render(<Login/>);
    expect(screen.getByText('Entrar na BayQi Erp')).toBeTruthy();
});