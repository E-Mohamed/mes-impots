# Mes Impôts

A very simple french income tax calculator (and not complete _-yet-_)

demo [here](https://e-mohamed.github.io/mes-impots/)

# Issues

- Refactore code and architecture
- improve style
- Add more validation on forms

# Known missed features

### 10% tax allowance

### Donation rules

For donation forms (7UD and 7UF) some rules are missing:

- Donation input form is not consider in tax calcul
- 7UD form max possible value is 1000
- 7UF form, is 66% reduction but with max of 20% of taxable income

### Investment

Many way of invest lead to tax reduction, some main of them are missing (7CI -> 18%, 7CH -> 25%)

### Electric car/ charging station purchase/ installation

### Personal service

Some personal services like childcare fees, home maintenance and so on can lead to tax reduction

# Ideas

### Architecture

As it's a simple app without heavy or complexy logic my proposition is something like :

app/

app/components/...

app/services/...

app.\*
