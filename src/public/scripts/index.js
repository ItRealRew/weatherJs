function AddNew() {
    const parentDiv = document.getElementsByClassName("grid")[0];

    const newEl = document.createElement("div");

    const DateDiv = document.createElement("div");
    DateDiv.textContent = "22:22";

    const PlaceDiv = document.createElement("div");
    PlaceDiv.textContent = "Владимир";

    const TemperatureDiv = document.createElement("div");
    TemperatureDiv.textContent = "24 градусов";

    const CloudСoverDiv = document.createElement("div");
    CloudСoverDiv.textContent = "Да";

    const SunshineDiv = document.createElement("div");
    SunshineDiv.textContent = "Да";

    const HumidityDiv = document.createElement("div");
    HumidityDiv.textContent = "Да";

    const WindDiv = document.createElement("div");
    WindDiv.textContent = "Северный";

    const CycloneDiv = document.createElement("div");
    CycloneDiv.textContent = "Нет";

    const AntiCycloneDiv = document.createElement("div");
    AntiCycloneDiv.textContent = "Нет";

    const AuthorDiv = document.createElement("div");
    AuthorDiv.textContent = "ItRelRew";

    newEl.appendChild(DateDiv);
    newEl.appendChild(PlaceDiv);
    newEl.appendChild(TemperatureDiv);
    newEl.appendChild(CloudСoverDiv);
    newEl.appendChild(SunshineDiv);
    newEl.appendChild(HumidityDiv);
    newEl.appendChild(WindDiv);
    newEl.appendChild(CycloneDiv);
    newEl.appendChild(AntiCycloneDiv);
    newEl.appendChild(AuthorDiv);

    newEl.classList.add("grid-body");
    newEl.classList.add("transition");
    newEl.classList.add("grid-rows");

    parentDiv.appendChild(newEl);
}