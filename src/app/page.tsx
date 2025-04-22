import SearchForm from "@/components/SearchForm";
import style from "./page.module.css";
export default async function Home() {
  return (
    <section>
      <div className={style.hop}>
        <h1 className={style.h1}>
          {" "}
          Мир, в котором <span className={style.yellow}>удобно всем</span>
        </h1>
        <div className={style.imgHop}></div>
      </div>
      <SearchForm />
      <div className={style.popularPlaces}>
        <h2 className={style.h2}>Популярные места</h2>
        <div className={style.slider}>
          <div className={style.imageSlider}>
            <div className={style.arrows}>
              <div className={style.arrowLeft}></div>
              <div className={style.arrowRight}></div>
            </div>
          </div>
        </div>
        <div className={style.text}>
          <div className={style.headText}>
            <h3 className={style.h3}>Название места</h3>
            <div className={style.stars}></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            saepe et enim, ullam ab quas sequi quasi error voluptate esse
            officiis, nostrum molestiae commodi tenetur nemo, aliquid earum
            laudantium odit. Quasi possimus quis quaerat vero molestiae iusto
            similique, tempore atque suscipit ratione nisi dolorem. Veritatis
            ea, consequatur quidem illo ad ratione reprehenderit dolores nisi,
            et recusandae amet quos fugit error! Suscipit repellendus similique
            dolore ipsam. Placeat, quae eos assumenda maxime reprehenderit
            numquam sit ullam commodi cum porro provident veritatis obcaecati in
            quia nam aliquam sequi nisi quo rerum possimus rem? Totam quisquam
            quam aspernatur delectus tempora blanditiis iste distinctio, ipsam
            earum architecto facilis repellat molestias veritatis cumque quos
            quae commodi officiis, ipsum iure! Perferendis odio laborum
            voluptatibus distinctio id magnam.
          </p>
          <div className={style.footText}>
            <div className={style.address}>
              <p>
                Адрес: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Ab magni fugit natus beatae accusantium, nulla harum molestiae
                mollitia eligendi laboriosam reiciendis delectus animi iste,
                facere voluptatibus blanditiis sunt. Rem, hic.
              </p>
            </div>
            <div className={style.workHours}>
              <p>
                График работы: <br />
                пн-вс 00:00 - 00:00
              </p>
            </div>
          </div>
          <div className={style.details}>
            <div className={style.card}>
              <h4 className={style.h4}>Для инвалидов и сопровождающих</h4>
              <div className={style.textCard}>
                <ul>
                  <li>тут сюда туда</li>
                  <li>сюда туда тут</li>
                </ul>
              </div>
            </div>
            <div className={style.card}>
              <h4 className={style.h4}>Для бизнеса</h4>
              <div className={style.textCard}>
                <ul>
                  <li>тут сюда туда</li>
                  <li>сюда туда тут</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={style.concl}>
          <h3 className={style.h3nc}>Помогаем людям с инвалидностью</h3>
          <p className={style.textConcl}>
            Помогаем людям с инвалидностью, используя тото сето там та там и
            туда сюда негры осуждаю Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Soluta corporis quisquam tempore! Repellendus
            necessitatibus soluta veritatis recusandae laudantium atque optio.
            Fugiat delectus itaque, tenetur beatae eum assumenda totam
            perspiciatis rerum.
          </p>
          <div className={style.empls}>
            <div className={style.empl}>
              <div className={style.emplImg}></div>
              <p>Сотрудник</p>
            </div>
            <div className={style.empl}>
              <div className={style.emplImg}></div>
              <p>Сотрудник</p>
            </div>
            <div className={style.empl}>
              <div className={style.emplImg}></div>
              <p>Сотрудник</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
